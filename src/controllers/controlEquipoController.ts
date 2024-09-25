import { Request, Response } from 'express';
import pool from '../database/mysql';

interface ControlEquipo {
    id: number;
    fecha: string;
    tecnico: string;
    agencia: string;
    codigo_agencia: string;
    n_ticket_mesa_ayuda: string;
    zona_region: string;
    tipo_solicitud: string;
    usuario: string;
    observacion: string;
}

interface DetalleEquipo {
    control_equipo_id: number;
    detalle_equipo_id: number;
    descripcion_equipo: string;
    codigo_inventario: string;
    serie_inventario: string;
    modelo_inventario: string;
    agencia_origen: number;
    codigo_agencia: string;
    marca_inventario: string;
}

export const getControlEquiposConDetalles = async (req: Request, res: Response): Promise<void> => {
    try {
        // Consulta para obtener los registros de control_equipo con información relacionada
        const [controlEquiposResult]:any = await pool.query(`
            SELECT 
                ce.id, 
                ce.fecha, 
                t.nombre AS tecnico, 
                a.nombre AS agencia, 
                a.codigo AS codigo_agencia,
                ce.n_ticket_mesa_ayuda, 
                ce.zona_region, 
                ds.nombre AS tipo_solicitud, 
                u.nombre AS usuario, 
                ce.observacion
            FROM 
                control_equipo ce
            JOIN tecnico t ON ce.tecnico_id = t.id
            JOIN agencias a ON ce.agencias_id = a.id
            JOIN detalle_solicitud ds ON ce.detalle_solicitud_id = ds.id
            JOIN usuario u ON ce.usuario_id = u.id
        `);

        // Consulta para obtener los detalles de los equipos asociados a cada control_equipo
        const [detallesEquiposResult]:any = await pool.query(`
            SELECT 
                ced.control_equipo_id,
                de.id AS detalle_equipo_id,
                de.descripcion_equipo, 
                inv.codigo AS codigo_inventario,
                inv.serie AS serie_inventario, 
                inv.modelo AS modelo_inventario,
                age.nombre AS agencia_origen,
                age.codigo AS codigo_agencia,
                m.nombre AS marca_inventario
            FROM 
                control_equipo_detalle ced
            JOIN detalle_equipo de ON ced.detalle_equipo_id = de.id
            JOIN inventario inv ON de.inventario_id = inv.id
            JOIN agencias age ON inv.agencias_id_origen = age.id
            JOIN marca m ON inv.marca_id = m.id;
        `);

        // Mapeamos los detalles a sus respectivos control_equipo
        const controlEquiposConDetalles = controlEquiposResult.map((controlEquipo: ControlEquipo) => {
            const detallesControlEquipo = detallesEquiposResult.filter((detalle: DetalleEquipo) => detalle.control_equipo_id === controlEquipo.id);

            return {
                ...controlEquipo,
                detalles: detallesControlEquipo
            };
        });

        // Enviamos los control_equipo con sus detalles
        res.status(200).json(controlEquiposConDetalles);

    } catch (error) {
        // En caso de error, enviamos un mensaje con status 500
        console.error(error);
        res.status(500).json({ error: 'Error fetching control equipos with details' });
    }
};

export const crearControlEquipo = async (req: Request, res: Response): Promise<void> => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const userId = (req as any).user?.id; // ID del usuario autenticado

    try {
        const {
            fecha,
            tecnico_id,
            agencias_id,
            n_ticket_mesa_ayuda,
            zona_region,
            detalle_solicitud_id,
            observacion,
            detalles_equipo // Aquí se recibe el array de detalles
        } = req.body;

        // Validar campos obligatorios
        if (!tecnico_id || !agencias_id || !detalle_solicitud_id || !userId) {
            res.status(400).json({ error: 'Faltan campos obligatorios' });
            return;
        }

        // Crear los detalles del equipo
        const detalleEquipoIds = [];
        for (const detalle of detalles_equipo) {
            const [result] :any= await connection.query(`
                INSERT INTO detalle_equipo (descripcion_equipo, inventario_id, agencias_id)
                VALUES (?, ?, ?)
            `, [detalle.descripcion_equipo, detalle.inventario_id, detalle.agencias_id]);

            detalleEquipoIds.push(result.insertId);
        }

        // Crear el registro de control_equipo
        const [controlResult]:any = await connection.query(`
            INSERT INTO control_equipo 
                (fecha, tecnico_id, agencias_id, n_ticket_mesa_ayuda, zona_region, detalle_solicitud_id, usuario_id, observacion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            fecha,
            tecnico_id,
            agencias_id,
            n_ticket_mesa_ayuda,
            zona_region,
            detalle_solicitud_id,
            userId,
            observacion
        ]);

        const controlEquipoId = controlResult.insertId;

        // Vincular los detalles con el control_equipo en la tabla intermedia
        for (const detalleId of detalleEquipoIds) {
            await connection.query(`
                INSERT INTO control_equipo_detalle (control_equipo_id, detalle_equipo_id)
                VALUES (?, ?)
            `, [controlEquipoId, detalleId]);
        }

        await connection.commit();
        res.status(201).json({ message: 'Control de equipo y detalles creados exitosamente' });

    } catch (error) {
        console.error(error);
        await connection.rollback();
        res.status(500).json({ error: 'Error al crear control de equipo' });
    } finally {
        connection.release();
    }
};


export const actualizarControlEquipo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = (req as any).user?.id; // ID del usuario autenticado

        const { fecha, tecnico_id, agencias_id, n_ticket_mesa_ayuda, zona_region, detalle_solicitud_id, observacion } = req.body;

        if (!fecha || !tecnico_id || !agencias_id || !detalle_solicitud_id || !userId) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar que las llaves foráneas existan
        const [tecnico] : any= await pool.query('SELECT id FROM tecnico WHERE id = ?', [tecnico_id]);
        const [agencia] : any= await pool.query('SELECT id FROM agencias WHERE id = ?', [agencias_id]);
        const [solicitud] : any= await pool.query('SELECT id FROM detalle_solicitud WHERE id = ?', [detalle_solicitud_id]);
        const [usuario] : any= await pool.query('SELECT id FROM usuario WHERE id = ?', [userId]);

        if (tecnico.length === 0) {
            res.status(404).json({ error: 'Técnico no válido' });
            return;
        }
        if (agencia.length === 0) {
            res.status(404).json({ error: 'Agencia no válida' });
            return;
        }
        if (solicitud.length === 0) {
            res.status(404).json({ error: 'Solicitud no válida' });
            return;
        }
        if (usuario.length === 0) {
            res.status(404).json({ error: 'Usuario no válido' });
            return;
        }

        const [result]: any = await pool.query(
            'UPDATE control_equipo SET fecha = ?, tecnico_id = ?, agencias_id = ?, n_ticket_mesa_ayuda = ?, zona_region = ?, detalle_solicitud_id = ?, usuario_id = ?, observacion = ? WHERE id = ?', 
            [fecha, tecnico_id, agencias_id, n_ticket_mesa_ayuda, zona_region, detalle_solicitud_id, userId, observacion, id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Control de equipo actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Control de equipo no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el control del equipo' });
    }
};

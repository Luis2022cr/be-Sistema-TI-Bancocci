import { Request, Response } from 'express';
import pool from '../database/mysql';

export const crearControlEquipo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            fecha,
            tecnico,
            agencia,
            ticketAyuda,
            equipoReparacion,
            equipoPrestado,
            otrosEspecificar,
            cambioEquipo,
            devolucionEquipo,
            entregaEquipo,
            equipoReparado,
            infraestructura,
            soporte,
            observaciones,
            equipos, // Array de equipos
        } = req.body;

        // Validar campos obligatorios
        if (!fecha || !tecnico || !agencia) {
            res.status(400).json({ error: 'Los campos fecha, técnico, agencia son obligatorios.' });
            return;
        }

        // Insertar en la tabla reparaciones
        const [reparacionResult]: any = await pool.query(`
            INSERT INTO reparaciones (
                fecha, tecnico, agencia, ticket_ayuda, equipo_reparacion, equipo_prestado,
                otros_especificar, cambio_equipo, devolucion_equipo, entrega_equipo, equipo_reparado,
                infraestructura, soporte, observaciones
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            fecha, tecnico, agencia, ticketAyuda, equipoReparacion, equipoPrestado,
            otrosEspecificar, cambioEquipo, devolucionEquipo, entregaEquipo, equipoReparado,
            infraestructura, soporte, observaciones,
        ]);

        const reparacionId = reparacionResult.insertId;

        // Insertar equipos relacionados en la tabla equipos_reparacion
        // Filtrar los equipos con contenido válido
        const equiposValidos = equipos.filter((equipo: any) =>
            equipo.descripcionEquipo || equipo.inventario || equipo.modeloTipo || equipo.serie || equipo.pertenece || equipo.destino
        );

        if (equiposValidos.length > 0) {
            const valoresEquipos = equiposValidos.map((equipo: any) => [
                reparacionId,
                equipo.descripcionEquipo,
                equipo.inventario,
                equipo.modeloTipo,
                equipo.serie,
                equipo.pertenece,
                equipo.destino,
            ]);

            // Insertar datos válidos en la tabla `equipos_reparacion`
            await pool.query(`
                INSERT INTO equipos_reparacion (
                    reparacion_id, descripcion_equipo, inventario, modelo_tipo,
                    serie, pertenece, destino
                ) VALUES ?
            `, [valoresEquipos]);
        }

        res.status(201).json({ message: 'Reparación y equipos registrados exitosamente.' });
    } catch (error) {
        // Revertir transacción en caso de error
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la reparación y los equipos.' });
    }
};

export const obtenerReparacionesConEquipos = async (req: Request, res: Response): Promise<void> => {
    try {
        // Obtener todas las reparaciones con sus respectivos equipos
        const [reparaciones]: any = await pool.query(`
            SELECT 
                r.id AS reparacion_id, 
                r.fecha, 
                r.tecnico, 
                r.agencia, 
                r.ticket_ayuda,
                r.equipo_reparacion, 
                r.equipo_prestado, 
                r.otros_especificar, 
                r.cambio_equipo,
                r.devolucion_equipo, 
                r.entrega_equipo, 
                r.equipo_reparado, 
                r.infraestructura,
                r.soporte, 
                r.observaciones, 
                r.fecha_creacion
            FROM 
                reparaciones r
            ORDER BY 
                r.fecha_creacion DESC;
        `);

        if (reparaciones.length === 0) {
            res.status(404).json({ error: 'No se encontraron reparaciones.' });
            return;
        }

        // Obtener equipos relacionados con las reparaciones
        const [equipos]: any = await pool.query(`
            SELECT er.reparacion_id, er.descripcion_equipo, er.inventario, er.modelo_tipo,
                   er.serie, er.pertenece, er.destino
            FROM equipos_reparacion er
        `);

        // Agrupar equipos por reparacion_id
        const reparacionesConEquipos = reparaciones.map((reparacion: any) => {
            const equiposRelacionados = equipos.filter((equipo: any) => equipo.reparacion_id === reparacion.reparacion_id);
            return { ...reparacion, equipos: equiposRelacionados };
        });

        // Devolver la lista de reparaciones con los equipos asociados
        res.status(200).json(reparacionesConEquipos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las reparaciones y equipos.' });
    }
};

export const obtenerReparacionPorId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // Obtener el ID de la reparación desde los parámetros de la URL

        // Validar que el ID sea un número
        if (isNaN(Number(id))) {
            res.status(400).json({ error: 'El ID de la reparación debe ser un número válido.' });
            return;
        }

        // Obtener la reparación por ID
        const [reparacion]: any = await pool.query(`
            SELECT r.id AS reparacion_id, r.fecha, r.tecnico, r.agencia, r.ticket_ayuda,
                   r.equipo_reparacion, r.equipo_prestado, r.otros_especificar, r.cambio_equipo,
                   r.devolucion_equipo, r.entrega_equipo, r.equipo_reparado, r.infraestructura,
                   r.soporte, r.observaciones, r.fecha_creacion, r.fecha_modificacion
            FROM reparaciones r
            WHERE r.id = ?
        `, [id]);

        if (reparacion.length === 0) {
            res.status(404).json({ error: `Reparación con ID ${id} no encontrada.` });
            return;
        }

        // Obtener los equipos relacionados con esta reparación
        const [equipos]: any = await pool.query(`
            SELECT er.reparacion_id, er.descripcion_equipo, er.inventario, er.modelo_tipo,
                   er.serie, er.pertenece, er.destino
            FROM equipos_reparacion er
            WHERE er.reparacion_id = ?
        `, [id]);

        // Incluir los equipos en el resultado de la reparación
        const reparacionConEquipos = { ...reparacion[0], equipos };

        // Devolver la reparación con los equipos relacionados
        res.status(200).json(reparacionConEquipos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la reparación y los equipos.' });
    }
};
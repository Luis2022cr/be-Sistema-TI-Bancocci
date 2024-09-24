import { Request, Response } from 'express';
import pool from '../database/mysql';


export const obtenerControlEquipo = async (req: Request, res: Response): Promise<void> => {
    try {
        const [controles] = await pool.query('SELECT * FROM control_equipo');
        res.status(200).json(controles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el control del equipo' });
    }
};

export const crearControlEquipo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fecha, tecnico_id, agencias_id, n_ticket_mesa_ayuda, zona_region, detalle_solicitud_id, detalle_equipo_id, usuario_id, observacion } = req.body;

        if (!fecha || !tecnico_id || !agencias_id || !detalle_solicitud_id || !detalle_equipo_id || !usuario_id) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar que las llaves foráneas existan
        const [tecnico] : any= await pool.query('SELECT id FROM tecnico WHERE id = ?', [tecnico_id]);
        const [agencia]: any = await pool.query('SELECT id FROM agencias WHERE id = ?', [agencias_id]);
        const [solicitud]: any = await pool.query('SELECT id FROM detalle_solicitud WHERE id = ?', [detalle_solicitud_id]);
        const [equipo] : any= await pool.query('SELECT id FROM detalle_equipo WHERE id = ?', [detalle_equipo_id]);
        const [usuario] : any= await pool.query('SELECT id FROM usuario WHERE id = ?', [usuario_id]);

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
        if (equipo.length === 0) {
            res.status(404).json({ error: 'Equipo no válido' });
            return;
        }
        if (usuario.length === 0) {
            res.status(404).json({ error: 'Usuario no válido' });
            return;
        }

        await pool.query('INSERT INTO control_equipo (fecha, tecnico_id, agencias_id, n_ticket_mesa_ayuda, zona_region, detalle_solicitud_id, detalle_equipo_id, usuario_id, observacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [fecha, tecnico_id, agencias_id, n_ticket_mesa_ayuda, zona_region, detalle_solicitud_id, detalle_equipo_id, usuario_id, observacion]);

        res.status(201).json({ message: 'Control de equipo creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el control del equipo' });
    }
};

export const actualizarControlEquipo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { fecha, tecnico_id, agencias_id, n_ticket_mesa_ayuda, zona_region, detalle_solicitud_id, detalle_equipo_id, usuario_id, observacion } = req.body;

        if (!fecha || !tecnico_id || !agencias_id || !detalle_solicitud_id || !detalle_equipo_id || !usuario_id) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar que las llaves foráneas existan
        const [tecnico] : any= await pool.query('SELECT id FROM tecnico WHERE id = ?', [tecnico_id]);
        const [agencia] : any= await pool.query('SELECT id FROM agencias WHERE id = ?', [agencias_id]);
        const [solicitud] : any= await pool.query('SELECT id FROM detalle_solicitud WHERE id = ?', [detalle_solicitud_id]);
        const [equipo]: any = await pool.query('SELECT id FROM detalle_equipo WHERE id = ?', [detalle_equipo_id]);
        const [usuario] : any= await pool.query('SELECT id FROM usuario WHERE id = ?', [usuario_id]);

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
        if (equipo.length === 0) {
            res.status(404).json({ error: 'Equipo no válido' });
            return;
        }
        if (usuario.length === 0) {
            res.status(404).json({ error: 'Usuario no válido' });
            return;
        }

        const [result]: any = await pool.query(
            'UPDATE control_equipo SET fecha = ?, tecnico_id = ?, agencias_id = ?, n_ticket_mesa_ayuda = ?, zona_region = ?, detalle_solicitud_id = ?, detalle_equipo_id = ?, usuario_id = ?, observacion = ? WHERE id = ?', 
            [fecha, tecnico_id, agencias_id, n_ticket_mesa_ayuda, zona_region, detalle_solicitud_id, detalle_equipo_id, usuario_id, observacion, id]
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

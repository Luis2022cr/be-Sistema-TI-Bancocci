import { Request, Response } from 'express';
import pool from '../database/mysql';

// Obtener todos los registros de detalle_solicitud
export const getDetallesSolicitud = async (req: Request, res: Response): Promise<void> => {
    try {
        const [detalles] = await pool.query('SELECT * FROM detalle_solicitud');
        res.status(200).json(detalles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de la solicitud' });
    }
};

// Crear un nuevo detalle de solicitud
export const crearDetalleSolicitud = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            res.status(400).json({ error: 'El nombre es obligatorio' });
            return;
        }

        await pool.query('INSERT INTO detalle_solicitud (nombre) VALUES (?)', [nombre]);

        res.status(201).json({ message: 'Detalle de solicitud creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el detalle de solicitud' });
    }
};

// Actualizar un detalle de solicitud existente
export const actualizarDetalleSolicitud = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        if (!nombre) {
            res.status(400).json({ error: 'El nombre es obligatorio' });
            return;
        }

        const [result]: any = await pool.query('UPDATE detalle_solicitud SET nombre = ? WHERE id = ?', [nombre, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Detalle de solicitud actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Detalle de solicitud no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el detalle de solicitud' });
    }
};

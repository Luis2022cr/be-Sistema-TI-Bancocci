import { Request, Response } from 'express';
import pool from '../database/mysql';


export const obtenerHistorialCambioUPS = async (req: Request, res: Response): Promise<void> => {
    try {
        const [historial] = await pool.query('SELECT * FROM historial_cambio_ups');
        res.status(200).json(historial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el historial de cambios de UPS' });
    }
};

export const crearHistorialCambioUPS = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ups_id, cambio, fecha_instalacion, proximo_cambio } = req.body;

        if (!ups_id || !cambio || !fecha_instalacion || !proximo_cambio) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar que el ups_id exista en la tabla ups
        const [ups]: any = await pool.query('SELECT id FROM ups WHERE id = ?', [ups_id]);
        if (ups.length === 0) {
            res.status(404).json({ error: 'UPS no válido' });
            return;
        }

        await pool.query('INSERT INTO historial_cambio_ups (ups_id, cambio, fecha_instalacion, proximo_cambio) VALUES (?, ?, ?, ?)', 
            [ups_id, cambio, fecha_instalacion, proximo_cambio]);

        res.status(201).json({ message: 'Historial de cambio de UPS creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el historial de cambios de UPS' });
    }
};

export const actualizarHistorialCambioUPS = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { ups_id, cambio, fecha_instalacion, proximo_cambio } = req.body;

        if (!ups_id || !cambio || !fecha_instalacion || !proximo_cambio) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar que el ups_id exista en la tabla ups
        const [ups]: any= await pool.query('SELECT id FROM ups WHERE id = ?', [ups_id]);
        if (ups.length === 0) {
            res.status(404).json({ error: 'UPS no válido' });
            return;
        }

        const [result]: any = await pool.query(
            'UPDATE historial_cambio_ups SET ups_id = ?, cambio = ?, fecha_instalacion = ?, proximo_cambio = ? WHERE id = ?', 
            [ups_id, cambio, fecha_instalacion, proximo_cambio, id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Historial de cambio de UPS actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Historial de cambio de UPS no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el historial de cambios de UPS' });
    }
};

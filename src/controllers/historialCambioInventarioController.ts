import { Request, Response } from 'express';
import pool from '../database/mysql';


export const obtenerHistorialCambioInventario = async (req: Request, res: Response): Promise<void> => {
    try {
        const [historial] = await pool.query(`
            SELECT 
                h.id, 
                h.inventario_id,
                h.cambio_realizado, 
                u.usuario AS usuario, 
                h.fecha_cambio
            FROM 
                historial_cambio_inventario h
            JOIN 
                inventario i ON h.inventario_id = i.id
            JOIN 
                usuario u ON h.usuario_id = u.id; 
        `);
        
        res.status(200).json(historial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el historial de cambios del inventario' });
    }
};


export const crearHistorialCambioInventario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { inventario_id, cambio_realizado, fecha_cambio } = req.body;
        const userId = (req as any).user?.id;

        if (!inventario_id || !cambio_realizado  || !fecha_cambio ) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar que el inventario_id exista en la tabla inventario
        const [inventario]: any = await pool.query('SELECT id FROM inventario WHERE id = ?', [inventario_id]);
        if (inventario.length === 0) {
            res.status(404).json({ error: 'Inventario no válido' });
            return;
        }

        await pool.query('INSERT INTO historial_cambio_inventario (inventario_id, cambio_realizado, usuario_id, fecha_cambio) VALUES (?, ?, ?, ?)', 
            [inventario_id, cambio_realizado, userId, fecha_cambio]);

        res.status(201).json({ message: 'Historial de cambio de Inventario creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el historial de cambios de Inventario' });
    }
};

export const actualizarHistorialCambioInventario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { inventario_id, cambio_realizado, usuario_id, fecha_cambio } = req.body;

        if (!inventario_id || !cambio_realizado || !usuario_id || !fecha_cambio) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar que el ups_id exista en la tabla ups
        const [inventario]: any= await pool.query('SELECT id FROM inventario WHERE id = ?', [inventario_id]);
        if (inventario.length === 0) {
            res.status(404).json({ error: 'UPS no válido' });
            return;
        }

        const [result]: any = await pool.query(
            'UPDATE historial_cambio_inventario SET inventario_id = ?, cambio_realizado = ?, usuario_id = ?, fecha_cambio = ? WHERE id = ?', 
            [inventario_id, cambio_realizado, usuario_id, fecha_cambio, id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Historial de cambio de inventario actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Historial de cambio de inventario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el historial de cambios de inventario' });
    }
};

import { Request, Response } from 'express';
import pool from '../database/mysql';

export const obtenerDetalleEquipo = async (req: Request, res: Response): Promise<void> => {
    try {
        const [detalles] = await pool.query('SELECT * FROM detalle_equipo');
        res.status(200).json(detalles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles del equipo' });
    }
};

export const crearDetalleEquipo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { descripcion_equipo, inventario_id, agencias_id } = req.body;

        if (!descripcion_equipo || !inventario_id || !agencias_id) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar que inventario_id y agencias_id existan
        const [inventario]: any = await pool.query('SELECT id FROM inventario WHERE id = ?', [inventario_id]);
        const [agencia]: any = await pool.query('SELECT id FROM agencias WHERE id = ?', [agencias_id]);

        if (inventario.length === 0) {
            res.status(404).json({ error: 'Inventario no válido' });
            return;
        }
        if (agencia.length === 0) {
            res.status(404).json({ error: 'Agencia no válida' });
            return;
        }

        await pool.query('INSERT INTO detalle_equipo (descripcion_equipo, inventario_id, agencias_id) VALUES (?, ?, ?)', 
            [descripcion_equipo, inventario_id, agencias_id]);

        res.status(201).json({ message: 'Detalle de equipo creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el detalle del equipo' });
    }
};

export const actualizarDetalleEquipo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { descripcion_equipo, inventario_id, agencias_id } = req.body;

        if (!descripcion_equipo || !inventario_id || !agencias_id) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar que inventario_id y agencias_id existan
        const [inventario]: any = await pool.query('SELECT id FROM inventario WHERE id = ?', [inventario_id]);
        const [agencia]: any = await pool.query('SELECT id FROM agencias WHERE id = ?', [agencias_id]);

        if (inventario.length === 0) {
            res.status(404).json({ error: 'Inventario no válido' });
            return;
        }
        if (agencia.length === 0) {
            res.status(404).json({ error: 'Agencia no válida' });
            return;
        }

        const [result]: any = await pool.query(
            'UPDATE detalle_equipo SET descripcion_equipo = ?, inventario_id = ?, agencias_id = ? WHERE id = ?', 
            [descripcion_equipo, inventario_id, agencias_id, id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Detalle de equipo actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Detalle de equipo no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el detalle del equipo' });
    }
};

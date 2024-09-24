import { Request, Response } from 'express';
import pool from '../database/mysql';


// Obtener todos los tipo inventario
export const getTipoInventario = async (req: Request, res: Response): Promise<void> => {
    try {
        const [tipo_inventario] = await pool.query('SELECT * FROM tipo_inventario');
        res.status(200).json(tipo_inventario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los Tipo Inventario' });
    }
};


// Crear un nuevo tipo inventario
export const crearTipoInventario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre } = req.body;

        // Validacion para que el nombre no esté vacío
        if (!nombre) {
            res.status(400).json({ error: 'Nombre es requerido' });
            return;
        }

        await pool.query('INSERT INTO tipo_inventario (nombre) VALUES (?)', [nombre]);

        res.status(201).json({ message: 'Tipo Inventario creada exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el Tipo Inventario' });
    }
};

// Actualizar un Tipo Inventario existente
export const actualizarTipoInventario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        if (!nombre) {
            res.status(400).json({ error: 'Nombre es requerido' });
            return;
        }

        const [result]: any = await pool.query('UPDATE tipo_inventario SET nombre = ? WHERE id = ?', [nombre, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Tipo Inventario actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Tipo Inventario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el Tipo Inventario' });
    }
};


import { Request, Response } from 'express';
import pool from '../database/mysql';

// Obtener todos los roles
export const getRoles = async (req: Request, res: Response): Promise<void> => {
    try {
        const [roles] = await pool.query('SELECT * FROM rol');
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los roles' });
    }
};


// Crear un nuevo rol
export const crearRol = async (req: Request, res: Response): Promise<void> => {
    try {
        const { descripcion } = req.body;

        // Validacion para que la descripción no esté vacía
        if (!descripcion) {
            res.status(400).json({ error: 'Descripción es requerida' });
            return;
        }

        await pool.query('INSERT INTO rol (descripcion) VALUES (?)', [descripcion]);

        res.status(201).json({ message: 'Rol creado exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el rol' });
    }
};

// Actualizar un rol existente
export const actualizaRol = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { descripcion } = req.body;

        if (!descripcion) {
            res.status(400).json({ error: 'Descripción es requerida' });
            return;
        }

        const [result]: any = await pool.query('UPDATE rol SET descripcion = ? WHERE id = ?', [descripcion, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Rol actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Rol no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el rol' });
    }
};

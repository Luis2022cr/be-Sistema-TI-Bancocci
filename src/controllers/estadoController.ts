import { Request, Response } from 'express';
import pool from '../database/mysql';


// Obtener todos los estados
export const getEstado = async (req: Request, res: Response): Promise<void> => {
    try {
        const [estados] = await pool.query('SELECT * FROM estado');
        res.status(200).json(estados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estados' });
    }
};


// Crear una nueva marca
export const crearEstado = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre } = req.body;

        // Validacion para que el nombre no esté vacío
        if (!nombre) {
            res.status(400).json({ error: 'Nombre es requerido' });
            return;
        }

        await pool.query('INSERT INTO estado (nombre) VALUES (?)', [nombre]);

        res.status(201).json({ message: 'Estado creado exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el estado' });
    }
};

// Actualizar un Estado existente
export const actualizarEstado = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        if (!nombre) {
            res.status(400).json({ error: 'Nombre es requerido' });
            return;
        }

        const [result]: any = await pool.query('UPDATE estado SET nombre = ? WHERE id = ?', [nombre, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Estado actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Estado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado' });
    }
};

export const getLog = async (req: Request, res: Response): Promise<void> => {
    try {
        const [logs] = await pool.query(`
            SELECT 
                logs.id, 
                logs.descripcion, 
                logs.cambio_realizado, 
                logs.fecha_cambio, 
                logs.usuario_id,
                usuario.nombre AS usuario_nombre
            FROM logs
            JOIN usuario ON logs.usuario_id = usuario.id
            ORDER BY logs.id DESC;
        `);

        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los registros de logs' });
    }
};

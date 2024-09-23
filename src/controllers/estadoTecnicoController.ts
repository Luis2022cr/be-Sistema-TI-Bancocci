import { Request, Response } from 'express';
import pool from '../database/mysql';


// Obtener todos los estados tecnico
export const getEstadoTecnico = async (req: Request, res: Response): Promise<void> => {
    try {
        const [estados] = await pool.query('SELECT * FROM estado_tecnico');
        res.status(200).json(estados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estados' });
    }
};


// Crear un nuevo estado 
export const crearEstadoTecnico = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre } = req.body;

        // Validacion para que el nombre no esté vacío
        if (!nombre) {
            res.status(400).json({ error: 'Nombre es requerido' });
            return;
        }

        await pool.query('INSERT INTO estado_tecnico (nombre) VALUES (?)', [nombre]);

        res.status(201).json({ message: 'Estado creado exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el estado' });
    }
};

// Actualizar un Estado existente
export const actualizarEstadoTecnico = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        if (!nombre) {
            res.status(400).json({ error: 'Nombre es requerido' });
            return;
        }

        const [result]: any = await pool.query('UPDATE estado_tecnico SET nombre = ? WHERE id = ?', [nombre, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Estado actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Estado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado' });
    }
};


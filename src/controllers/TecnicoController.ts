import { Request, Response } from 'express';
import pool from '../database/mysql';

// Obtener todos los Técnicos
export const getTecnicos = async (req: Request, res: Response): Promise<void> => {
    try {
        const [tecnicos] = await pool.query('SELECT * FROM tecnico');
        res.status(200).json(tecnicos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los técnicos' });
    }
};

// Obtener Técnico por ID
export const getTecnicoPorId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const [tecnico]: any = await pool.query('SELECT * FROM tecnico WHERE id = ?', [id]);

        if (tecnico.length > 0) {
            res.status(200).json(tecnico[0]);
        } else {
            res.status(404).json({ error: 'Técnico no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el técnico' });
    }
};

// Crear un nuevo Técnico
export const crearTecnico = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, numero_identidad, estado_id } = req.body;

        if (!nombre || !numero_identidad || !estado_id) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar si el estado_id existe
        const [estado]: any = await pool.query('SELECT id FROM estado_tecnico WHERE id = ?', [estado_id]);
        if (estado.length === 0) {
            res.status(400).json({ error: 'El estado_id proporcionado no existe' });
            return;
        }

        // Si el estado existe, proceder a crear el técnico
        await pool.query('INSERT INTO tecnico (nombre, numero_identidad, estado_id) VALUES (?, ?, ?)', [nombre, numero_identidad, estado_id]);

        res.status(201).json({ message: 'Técnico creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el técnico' });
    }
};

// Editar un Técnico existente
export const actualizarTecnico = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre, numero_identidad, estado_id } = req.body;

        if (!nombre || !numero_identidad || !estado_id) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        const [result]: any = await pool.query('UPDATE tecnico SET nombre = ?, numero_identidad = ?, estado_id = ? WHERE id = ?', [nombre, numero_identidad, estado_id, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Técnico actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Técnico no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el técnico' });
    }
};

// Eliminar (cambiar estado a Inactivo) un Técnico
export const eliminarTecnico = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const [result]: any = await pool.query('UPDATE tecnico SET estado_id = 2 WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Técnico marcado como Inactivo exitosamente' });
        } else {
            res.status(404).json({ error: 'Técnico no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar (inactivar) el técnico' });
    }
};

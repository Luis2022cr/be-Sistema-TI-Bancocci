import { Request, Response } from 'express';
import pool from '../database/mysql';


// Obtener todas las marcas
export const getModelo = async (req: Request, res: Response): Promise<void> => {
    try {
        const [marcas] = await pool.query(`SELECT 
 			m.nombre, 
 			ma.nombre as marca
            FROM modelo m
            JOIN marca ma ON m.marca_id = ma.id`);
        res.status(200).json(marcas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los modelos' });
    }
};


// Crear una nueva marca
export const crearModelo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, marca_id} = req.body;

        // Validacion para que el nombre no esté vacío
        if (!nombre || !marca_id) {
            res.status(400).json({ error: 'Nombre y Marca son requeridos' });
            return;
        }

        await pool.query('INSERT INTO modelo (nombre, marca_id) VALUES (?, ?)', [nombre, marca_id]);

        res.status(201).json({ message: 'Modelo creada exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el modelo' });
    }
};

// Actualizar un Marca existente
export const actualizarModelo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const { marca_id } = req.body;

        if (!nombre || !marca_id) {
            res.status(400).json({ error: 'Nombre y Marca son requeridos' });
            return;
        }

        const [result]: any = await pool.query('UPDATE modelo SET nombre = ? marca_id = ? WHERE id = ?', [nombre, , marca_id ,id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Modelo actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Modelo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar 1el modelo' });
    }
};


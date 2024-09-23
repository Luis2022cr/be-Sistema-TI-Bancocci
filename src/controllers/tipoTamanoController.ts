import { Request, Response } from 'express';
import pool from '../database/mysql';


// Obtener todos los Tipo Tamaño
export const getTipoTamano = async (req: Request, res: Response): Promise<void> => {
    try {
        const [tipo_tamano] = await pool.query('SELECT * FROM tipo_tamano');
        res.status(200).json(tipo_tamano);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los Tipos Tamaño' });
    }
};


// Crear un nuevo Tipo Tamaño
export const crearTipoTamano = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre } = req.body;

        // Validacion para que el nombre no esté vacío
        if (!nombre) {
            res.status(400).json({ error: 'Nombre es requerido' });
            return;
        }

        await pool.query('INSERT INTO tipo_tamano (nombre) VALUES (?)', [nombre]);

        res.status(201).json({ message: 'Tipo Tamaño creado exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el Tipo Tamaño' });
    }
};

// Actualizar un Tipo Tamaño existente
export const actualizarTipoTamano = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        if (!nombre) {
            res.status(400).json({ error: 'Nombre es requerido' });
            return;
        }

        const [result]: any = await pool.query('UPDATE tipo_tamano SET nombre = ? WHERE id = ?', [nombre, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Tipo Tamaño actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Tipo Tamaño no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el Tipo Tamaño' });
    }
};


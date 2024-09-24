import { Request, Response } from 'express';
import pool from '../database/mysql';


// Obtener todos las agencias
export const getAgencias= async (req: Request, res: Response): Promise<void> => {
    try {
        const [agencias] = await pool.query('SELECT * FROM agencias');
        res.status(200).json(agencias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las agencias' });
    }
};


// Crear una nueva agencias 
export const crearAgencias = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, ubicacion, codigo, estado_agencias_id } = req.body;

        // Validacion para que el nombre no esté vacío
        if (!nombre || !ubicacion || !codigo || !estado_agencias_id ) {
            res.status(400).json({ error: 'todos los datos son requeridos' });
            return;
        }

        await pool.query(`
            INSERT INTO agencias 
            (nombre, ubicacion, codigo, estado_agencias_id) 
            VALUES (?, ? , ?, ?)`
            , [nombre, ubicacion, codigo, estado_agencias_id]);

        res.status(201).json({ message: 'Agencia creado exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el agencia' });
    }
};

// Actualizar una agencias
export const actualizarAgencias = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre, ubicacion, codigo } = req.body;

         // Validacion para que el nombre no esté vacío
         if (!nombre || !ubicacion || !codigo) {
            res.status(400).json({ error: 'todos los datos son requeridos' });
            return;
        }

        const [result]: any = await pool.query(`
            UPDATE agencias 
            SET nombre= ?, ubicacion= ?, codigo= ? 
            WHERE id= ?;
            `, [nombre, ubicacion, codigo, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'agencias actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'agencias no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el agencias' });
    }
};

// Actualizar solo el estado de una agencia
export const actualizarEstadoAgencia = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Validación para asegurarse de que el estado_agencias_id esté presente
        if (!id) {
            res.status(400).json({ error: 'El requerido' });
            return;
        }

        // Consulta SQL para actualizar solo el estado
        const [result]: any = await pool.query(`
            UPDATE agencias 
            SET estado_agencias_id = 2
            WHERE id = ?`, 
            [id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Estado de la agencia actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Agencia no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado de la agencia' });
    }
};
 


import { Request, Response } from 'express';
import pool from '../database/mysql';


// Obtener todos las agencias
export const getAgencias= async (req: Request, res: Response): Promise<void> => {
    try {
        const [agencias] = await pool.query(
            `  SELECT 
            a.id,
            a.nombre ,
            a.ubicacion ,
            a.codigo ,
        	a.estado_agencias_id,
        	ea.nombre as estado_agencias
            FROM agencias a 
            JOIN estado_agencias ea ON a.estado_agencias_id = ea.id`);
        res.status(200).json(agencias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las agencias' });
    }
};

export const getAgenciasById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const [agencias]: any = await pool.query(`
              SELECT *
            FROM agencias
            WHERE id = ?
        `, [id]);

        if (agencias.length > 0) {
            res.status(200).json(agencias[0]);
        } else {
            res.status(404).json({ error: 'Agencias no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la agencia' });
    }
};

// Crear una nueva agencias 
export const crearAgencias = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, ubicacion, codigo } = req.body;

        // Validacion para que el nombre no esté vacío
        if (!nombre || !ubicacion || !codigo ) {
            res.status(400).json({ error: 'todos los datos son requeridos' });
            return;
        }

        await pool.query(`
            INSERT INTO agencias 
            (nombre, ubicacion, codigo,estado_agencias_id) 
            VALUES (?, ? , ?, 1)`
            , [nombre, ubicacion, codigo]);

        res.status(201).json({ message: 'Agencia creado exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el agencia' });
    }
};

// Actualizar una agencias
export const actualizarAgencias = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre, ubicacion, codigo , estado_agencias_id} = req.body;

         // Validacion para que el nombre no esté vacío
         if (!nombre || !ubicacion || !codigo  || !estado_agencias_id) {
            res.status(400).json({ error: 'todos los datos son requeridos' });
            return;
        }

        const [result]: any = await pool.query(`
            UPDATE agencias 
            SET nombre= ?, ubicacion= ?, codigo= ? , estado_agencias_id = ?
            WHERE id= ?;
            `, [nombre, ubicacion, codigo, estado_agencias_id, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'agencias actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'agencias no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el agencias' });
    }
};



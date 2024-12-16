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

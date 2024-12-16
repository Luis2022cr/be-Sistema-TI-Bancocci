import { Request, Response } from 'express';
import pool from '../database/mysql';


// Obtener todos los estados tecnico
export const getEstadoAgencias= async (req: Request, res: Response): Promise<void> => {
    try {
        const [estados] = await pool.query('SELECT * FROM estado_agencias');
        res.status(200).json(estados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estados' });
    }
};

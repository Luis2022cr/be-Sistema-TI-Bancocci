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



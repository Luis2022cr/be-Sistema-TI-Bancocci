import { Request, Response } from 'express';
import pool from '../database/mysql';

// Obtener todos los tipo inventario
export const getTipoInventario = async (req: Request, res: Response): Promise<void> => {
    try {
        const [tipo_inventario] = await pool.query('SELECT * FROM tipo_inventario');
        res.status(200).json(tipo_inventario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los Tipo Inventario' });
    }
};

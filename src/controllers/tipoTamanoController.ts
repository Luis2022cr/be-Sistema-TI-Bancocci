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

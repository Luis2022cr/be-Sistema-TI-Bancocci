import { Request, Response } from 'express';
import pool from '../database/mysql';

export const getEjemplo = async (req: Request, res: Response): Promise<void> => {
    try {
        const [agencia] = await pool.query('SELECT * FROM agencia;');
        const [estado] = await pool.query('SELECT * FROM estado;');

        if(estado){
            res.status(200).json(estado)
        }else{
            res.status(400).json({ error: 'datos no otenidos de la base de datos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'error al obtener los datos' });
    }
};
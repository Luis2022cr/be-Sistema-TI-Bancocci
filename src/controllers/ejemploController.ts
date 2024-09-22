import { Request, Response } from 'express';
import pool from '../database/mysql';

export const getEjemplo = async (req: Request, res: Response): Promise<void> => {
    try {
        // Realizamos la consulta con un JOIN para obtener los datos de agencias y sus estados
        const [agenciasConEstados]= await pool.query(`
            SELECT a.id, a.nombre, a.ubicacion, a.codigo, e.nombre AS estado
            FROM agencias a
            JOIN estado_agencias e ON a.estado_agencias_id = e.id;
        `);

        // Verificamos si la consulta devolvió resultados
        if (agenciasConEstados) {
            res.status(200).json(agenciasConEstados );
        } else {
            res.status(400).json({ error: 'No se obtuvieron datos de la base de datos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};
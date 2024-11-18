import { Request, Response } from 'express';
import pool from '../database/mysql';


// Obtener todas las marcas
export const getMarca = async (req: Request, res: Response): Promise<void> => {
    try {
        const [marcas]: any = await pool.query('SELECT * FROM marca');
        res.status(200).json(marcas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las marcas' });
    }
};


export const getMarcaById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const [marca]: any = await pool.query(`
              SELECT * From marca
            WHERE id = ?
        `, [id]);

        if (marca.length > 0) {
            res.status(200).json(marca[0]);
        } else {
            res.status(404).json({ error: 'Marca no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el Marca' });
    }
};


// Crear una nueva marca
export const crearMarca = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre } = req.body;

        // Validacion para que el nombre no esté vacío
        if (!nombre) {
            res.status(400).json({ error: 'Nombre es requerido' });
            return;
        }

        await pool.query('INSERT INTO marca (nombre) VALUES (?)', [nombre]);

        res.status(201).json({ message: 'Marca creada exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la marca' });
    }
};


// Actualizar un Marca existente
export const actualizarMarca = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        if (!nombre) {
            res.status(400).json({ error: 'Nombre es requerido' });
            return;
        }

        const [result]: any = await pool.query('UPDATE marca SET nombre = ? WHERE id = ?', [nombre, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Marca actualizada exitosamente' });
        } else {
            res.status(404).json({ error: 'Marca no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la marca' });
    }
};


import { Request, Response } from 'express';
import pool from '../database/mysql';


// Obtener todos los departamentos
export const getDepto = async (req: Request, res: Response): Promise<void> => {
    try {
        const [departamentos] = await pool.query('SELECT * FROM departamentos');
        res.status(200).json(departamentos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los roles' });
    }
};


// Crear un nuevo Departamento
export const crearDepartamentos = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre } = req.body;

        // Validacion para que el nombre no esté vacío
        if (!nombre) {
            res.status(400).json({ error: 'Nombre es requerido' });
            return;
        }

        await pool.query('INSERT INTO departamentos (nombre) VALUES (?)', [nombre]);

        res.status(201).json({ message: 'Departamento creado exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el Departamento' });
    }
};

// Actualizar un Departamento existente
export const actualizarDepartamento = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        if (!nombre) {
            res.status(400).json({ error: 'Nombre es requerido' });
            return;
        }

        const [result]: any = await pool.query('UPDATE departamentos SET nombre = ? WHERE id = ?', [nombre, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Departamento actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Departamento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el departamento' });
    }
};


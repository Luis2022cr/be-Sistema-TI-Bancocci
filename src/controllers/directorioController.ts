import { Request, Response } from 'express';
import pool from '../database/mysql';

// Obtener todos los directorios con nombres de departamento y agencia
export const getDirectorios = async (req: Request, res: Response): Promise<void> => {
    try {
        const [directorios] = await pool.query(`
            SELECT d.id, d.extension, d.empleado, dep.nombre AS departamento, ag.nombre AS agencia
            FROM directorios d
            JOIN departamentos dep ON d.departamento_id = dep.id
            JOIN agencias ag ON d.agencias_id = ag.id
        `);
        res.status(200).json(directorios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los directorios' });
    }
};

// Crear un nuevo directorio con validación de extensión única
export const crearDirectorio = async (req: Request, res: Response): Promise<void> => {
    try {
        const { extension, departamento_id, agencias_id, empleado_id } = req.body;

        // Validar que todos los campos estén presentes
        if (!extension || !departamento_id || !agencias_id || !empleado_id) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar si la extensión ya existe
        const [existeExtension]: any = await pool.query('SELECT * FROM directorios WHERE extension = ?', [extension]);
        if (existeExtension.length > 0) {
            res.status(400).json({ error: 'La extensión ya existe. Debe ser única.' });
            return;
        }

        await pool.query(`
            INSERT INTO directorios (extension, departamento_id, agencias_id, empleado_id)
            VALUES (?, ?, ?, ?)`,
            [extension, departamento_id, agencias_id, empleado_id]
        );

        res.status(201).json({ message: 'Directorio creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el directorio' });
    }
};

// Actualizar un directorio existente con validación de extensión única
export const actualizarDirectorio = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { extension, departamento_id, agencias_id, empleado_id } = req.body;

        // Validar que todos los campos estén presentes
        if (!extension || !departamento_id || !agencias_id || !empleado_id) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar si la extensión ya existe en otro directorio
        const [existeExtension]: any = await pool.query(`
            SELECT * FROM directorios WHERE extension = ? AND id != ?`, [extension, id]
        );
        if (existeExtension.length > 0) {
            res.status(400).json({ error: 'La extensión ya existe. Debe ser única.' });
            return;
        }

        const [result]: any = await pool.query(`
            UPDATE directorios 
            SET extension = ?, departamento_id = ?, agencias_id = ?, empleado_id = ?
            WHERE id = ?`, 
            [extension, departamento_id, agencias_id, empleado_id, id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Directorio actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Directorio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el directorio' });
    }
};

// Eliminar un directorio
export const eliminarDirectorio = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const [result]: any = await pool.query(`
            DELETE FROM directorios WHERE id = ?
            `, [id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Directorio eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Directorio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el directorio' });
    }
};

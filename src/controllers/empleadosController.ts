import { Request, Response } from 'express';
import pool from '../database/mysql';


// Obtener todos los empleados
export const getEmpleados= async (req: Request, res: Response): Promise<void> => {
    try {
        const [empleados] = await pool.query('SELECT * FROM empleados');
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los empleados' });
    }
};


// Crear un nuevo empleados
export const crearEmpleado = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre } = req.body;

        // Validacion para que el nombre no esté vacío
        if (!nombre) {
            res.status(400).json({ error: 'Nombre es requerido' });
            return;
        }

        await pool.query('INSERT INTO empleados (nombre) VALUES (?)', [nombre]);

        res.status(201).json({ message: 'Empleado creado exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el empleado' });
    }
};

// Actualizar un Empleado existente
export const actualizarEmpleado = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        if (!nombre) {
            res.status(400).json({ error: 'Nombre es requerido' });
            return;
        }

        const [result]: any = await pool.query('UPDATE empleados SET nombre = ? WHERE id = ?', [nombre, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Empleado actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Empleado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el empleado' });
    }
    
    };

    // Eliminar un Empleado existente
export const eliminarEmpleado = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const [result]: any = await pool.query('DELETE FROM empleados WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Empleado eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Empleado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el empleado' });
    }
};



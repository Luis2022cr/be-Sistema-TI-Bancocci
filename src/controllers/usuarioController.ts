import { Request, Response } from 'express';
import pool from '../database/mysql';

// Obtener el perfil de un usuario
export const getPerfilUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.id; // ID del usuario autenticado

        const [rows]: any = await pool.query(`
            SELECT u.nombre, u.correo, u.usuario, r.descripcion AS rol
            FROM usuario u
            JOIN rol r ON u.rol_id = r.id
            WHERE u.id = ?;`,

            [userId]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
    }
};

// Editar el perfil de un usuario
export const actualizarPerfilUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.id; // ID del usuario autenticado
        const { nombre, correo } = req.body;

        // Validar que los campos no estén vacíos
        if (!nombre || !correo) {
            res.status(400).json({ error: 'Nombre y correo son requeridos' });
            return;
        }

        const [result]: any = await pool.query(
            'UPDATE usuario SET nombre = ?, correo = ? WHERE id = ?',
            [nombre, correo, userId]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Perfil actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el perfil del usuario' });
    }
};

// Obtener el todos los usuarios
export const getUsuarios = async (req: Request, res: Response): Promise<void> => {
    try {

        const [resultados]: any = await pool.query(`
            SELECT 
                u.id,
                u.nombre, 
                u.correo, 
                u.usuario, 
                DATE_FORMAT(u.fecha_creacion, '%Y-%m-%d %H:%i:%s') AS fecha_creacion, 
                DATE_FORMAT(u.fecha_modificacion, '%Y-%m-%d %H:%i:%s') AS fecha_modificacion, 
                r.descripcion AS rol
            FROM usuario u
            JOIN rol r ON u.rol_id = r.id;
            `);
        if (resultados) {
            res.status(200).json(resultados);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
    }
};

// Editar el perfil de un usuario
export const actualizarDatosUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params;
        const { nombre, correo, rol_id } = req.body;

        // Validar que los campos no estén vacíos
        if (!nombre || !correo || !rol_id) {
            res.status(400).json({ error: 'Nombre y correo son requeridos' });
            return;
        }

        const [result]: any = await pool.query(
            'UPDATE usuario SET nombre = ?, correo = ?, rol_id = ? WHERE id = ?',
            [nombre, correo, rol_id, id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Perfil actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el perfil del usuario' });
    }
};
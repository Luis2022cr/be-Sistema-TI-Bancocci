import { Request, Response } from 'express';
import pool from '../database/mysql';

// Obtener todos los inventarios
export const getInventarios = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extraemos los posibles filtros desde los query params
        const { tipo_inventario_id } = req.query;
        
        // Base query
        let query = `
            SELECT 
                i.id, i.codigo, i.serie, i.comentarios, i.fecha_creacion, i.fecha_modificacion, 
                ti.nombre AS tipo_inventario, m.nombre AS marca, md.nombre as modelo, ag_origen.nombre AS agencia_origen, 
                ag_actual.nombre AS agencia_actual, est.nombre AS estado, u.nombre AS usuario
            FROM inventario i
            JOIN tipo_inventario ti ON i.tipo_inventario_id = ti.id
            JOIN marca m ON i.marca_id = m.id
            JOIN modelo md ON i.modelo_id = md.id
            JOIN agencias ag_origen ON i.agencias_id_origen = ag_origen.id
            JOIN agencias ag_actual ON i.agencias_id_actual = ag_actual.id
            JOIN estado est ON i.estado_id = est.id
            JOIN usuario u ON i.usuario_id = u.id
        `;
        
        // Array para los valores que pasaremos a la consulta
        const queryParams: any[] = [];
        
        // Si el tipo_inventario_id está presente, añadimos una cláusula WHERE
        if (tipo_inventario_id) {
            query += ` WHERE i.tipo_inventario_id = ?`;
            queryParams.push(tipo_inventario_id);  // Agregamos el valor a los parámetros
        }
        
        // Ejecutamos la consulta con los parámetros que tengamos
        const [inventarios] = await pool.query(query, queryParams);
        
        // Devolvemos los resultados
        res.status(200).json(inventarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los inventarios' });
    }
};


// Obtener inventario por ID
export const getInventarioPorId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const [inventario]: any = await pool.query(`
              SELECT i.*, 
                   ti.nombre AS tipo_inventario, m.nombre AS marca,  md.nombre as modelo,
                   ag_origen.nombre AS agencia_origen, ag_actual.nombre AS agencia_actual, 
                   est.nombre AS estado, u.nombre AS usuario
            FROM inventario i
            JOIN tipo_inventario ti ON i.tipo_inventario_id = ti.id
            JOIN marca m ON i.marca_id = m.id
            JOIN modelo md ON i.modelo_id = md.id
            JOIN agencias ag_origen ON i.agencias_id_origen = ag_origen.id
            JOIN agencias ag_actual ON i.agencias_id_actual = ag_actual.id
            JOIN estado est ON i.estado_id = est.id
            JOIN usuario u ON i.usuario_id = u.id
            WHERE i.id = ?
        `, [id]);

        if (inventario.length > 0) {
            res.status(200).json(inventario[0]);
        } else {
            res.status(404).json({ error: 'Inventario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el inventario' });
    }
};

// Crear un nuevo inventario
export const crearInventario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { codigo, serie, tipo_inventario_id, marca_id, modelo_id, agencias_id_origen, agencias_id_actual, estado_id, comentarios } = req.body;
        const userId = (req as any).user?.id; // ID del usuario autenticado

        // Validar que todos los campos estén presentes
        if (!codigo || !serie || !tipo_inventario_id || !marca_id || !modelo_id || !agencias_id_origen || !agencias_id_actual || !estado_id || !userId) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar si los IDs de las agencias, estado, tipo y usuario existen
        const [tipoInventario]: any = await pool.query('SELECT id FROM tipo_inventario WHERE id = ?', [tipo_inventario_id]);
        const [modelo]: any = await pool.query('SELECT id FROM modelo WHERE id = ?', [modelo_id]);
        const [marca]: any = await pool.query('SELECT id FROM marca WHERE id = ?', [marca_id]);
        const [estado]: any = await pool.query('SELECT id FROM estado WHERE id = ?', [estado_id]);
        const [usuario]: any = await pool.query('SELECT id FROM usuario WHERE id = ?', [userId]);

        if (tipoInventario.length === 0 || marca.length === 0 || estado.length === 0 || usuario.length === 0) {
            res.status(400).json({ error: 'ID de tipo, marca, modelo, estado o usuario no válido' });
            return;
        }

        // Crear el inventario
        await pool.query(`
            INSERT INTO inventario (codigo, serie, tipo_inventario_id, marca_id, modelo_id, agencias_id_origen, agencias_id_actual, estado_id, usuario_id, comentarios)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [codigo, serie, tipo_inventario_id, marca_id, modelo_id, agencias_id_origen, agencias_id_actual, estado_id, userId, comentarios]);

        res.status(201).json({ message: 'Inventario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el inventario' });
    }
};

// Actualizar un inventario existente
export const actualizarInventario = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.id; // ID del usuario autenticado

        const { id } = req.params;
        const { codigo, serie, tipo_inventario_id, marca_id, modelo_id, agencias_id_origen, agencias_id_actual, estado_id, comentarios } = req.body;

        // Validar que todos los campos estén presentes
        if (!codigo || !serie || !tipo_inventario_id || !marca_id || !modelo_id || !agencias_id_origen || !agencias_id_actual || !estado_id ) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Actualizar el inventario
        const [result]: any = await pool.query(`
            UPDATE inventario
            SET codigo = ?, serie = ?, tipo_inventario_id = ?, marca_id = ?, modelo_id = ?, agencias_id_origen = ?, agencias_id_actual = ?, estado_id = ?, usuario_id = ?, comentarios = ?
            WHERE id = ?
        `, [codigo, serie, tipo_inventario_id, marca_id, modelo_id, agencias_id_origen, agencias_id_actual, estado_id, userId, comentarios, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Inventario actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Inventario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el inventario' });
    }
};

// Eliminar (cambiar estado) un inventario

    export const eliminarInventario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const [result]: any = await pool.query('UPDATE inventario SET estado_id = 4 WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Inventario marcado como inactivo exitosamente' });
        } else {
            res.status(404).json({ error: 'Inventario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al inactivar el inventario' });
    }
};



import { Request, Response } from 'express';
import pool from '../database/mysql';

// Obtener todos los directorios con nombres de departamento y agencia
export const getDirectorios = async (req: Request, res: Response): Promise<void> => {
    try {
        const [directorios] = await pool.query(`
            SELECT d.id, d.extension, d.empleado, dep.id AS departamento_id, dep.nombre AS departamento,ag.id AS agenciaId , ag.nombre AS agencia, ag.codigo AS codigo
            FROM directorios d
            JOIN departamentos dep ON d.departamento_id = dep.id
            JOIN agencias ag ON d.agencias_id = ag.id
        `);
        res.status(200).json(directorios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los directorios' });
    }
};

export const getDirectoriosById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const [directorios]:any = await pool.query(`
            SELECT d.id, d.extension, d.empleado, dep.id AS departamento_id, dep.nombre AS departamento,ag.id AS agenciaId , ag.nombre AS agencia
            FROM directorios d
            JOIN departamentos dep ON d.departamento_id = dep.id
            JOIN agencias ag ON d.agencias_id = ag.id
            WHERE d.id = ?
        `, [id]);
        

        res.status(200).json(directorios[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los directorios' });
    }
};


// Crear un nuevo directorio con validación de extensión única
export const crearDirectorio = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.id; // ID del usuario autenticado
        
        const { extension, departamento_id, agencias_id, empleado } = req.body;

        if (!extension || !departamento_id || !agencias_id || !empleado) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        if (typeof extension !== 'number' || extension.toString().length > 6) {
            res.status(400).json({ error: 'La extensión debe ser un número de hasta 6 dígitos' });
            return;
        }

        const [existeExtension]: any = await pool.query('SELECT * FROM directorios WHERE extension = ?', [extension]);
        if (existeExtension.length > 0) {
            res.status(400).json({ error: 'La extensión ya existe. Debe ser única.' });
            return;
        }

        await pool.query(`
            INSERT INTO directorios (extension, departamento_id, agencias_id, empleado)
            VALUES (?, ?, ?, ?)`,
            [extension, departamento_id, agencias_id, empleado]
        );

        // Log de creación
        const descripcion = `Se creó un nuevo directorio con extensión: ${extension}`;
        const cambioRealizado = `Extensión: ${extension}, Departamento ID: ${departamento_id}, Agencia ID: ${agencias_id}, Empleado: ${empleado}`;
        await pool.query(`INSERT INTO logs (descripcion, cambio_realizado, usuario_id) VALUES (?, ?, ?)`, [descripcion, cambioRealizado, userId]);

        res.status(201).json({ message: 'Directorio creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el directorio' });
    }
};


// Actualizar un directorio existente con validación de extensión única
export const actualizarDirectorio = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.id; // ID del usuario autenticado
        const { id } = req.params;
        const { extension, departamento_id, agencias_id, empleado } = req.body;

        // Validación de campos obligatorios
        if (!extension || !departamento_id || !agencias_id || !empleado) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Validar longitud de la extensión
        if (extension.toString().length > 6) {
            res.status(400).json({ error: 'La extensión debe ser un número de hasta 6 dígitos' });
            return;
        }

        // Verificar si la extensión ya existe en otro registro
        const [existeExtension]: any = await pool.query(
            `SELECT * FROM directorios WHERE extension = ? AND id != ?`, 
            [extension, id]
        );
        if (existeExtension.length > 0) {
            res.status(400).json({ error: 'La extensión ya existe. Debe ser única.' });
            return;
        }

        // Obtener datos del directorio actual antes de actualizar
        const [directorios]: any = await pool.query(`SELECT * FROM directorios WHERE id = ?`, [id]);
        if (directorios.length === 0) {
            res.status(404).json({ error: 'Directorio no encontrado' });
            return;
        }

        const directorioAnterior = directorios[0];
        let cambios: string[] = [];

        // Comparar y registrar cambios solo si se detectan diferencias
        const registrarCambio = (campo: string, valorAnterior: any, valorNuevo: any) => {
            if (valorAnterior !== valorNuevo) {
                cambios.push(`${campo}: '${valorAnterior}' -> '${valorNuevo}'`);
            }
        };

        registrarCambio('Extensión', directorioAnterior.extension, extension);
        registrarCambio('Departamento ID', directorioAnterior.departamento_id, departamento_id);
        registrarCambio('Agencia ID', directorioAnterior.agencias_id, agencias_id);
        registrarCambio('Empleado', directorioAnterior.empleado, empleado);

        // Actualizar el directorio
        const [result]: any = await pool.query(
            `UPDATE directorios 
             SET extension = ?, departamento_id = ?, agencias_id = ?, empleado = ?
             WHERE id = ?`,
            [extension, departamento_id, agencias_id, empleado, id]
        );

        if (result.affectedRows > 0) {
            // Registrar log solo si hubo cambios
            if (cambios.length > 0) {
                const descripcion = `Se actualizó el directorio con ID: ${id}`;
                const cambioRealizado = cambios.join(', '); // Unir los cambios en una sola cadena
                await pool.query(
                    `INSERT INTO logs (descripcion, cambio_realizado, usuario_id) 
                     VALUES (?, ?, ?)`,
                    [descripcion, cambioRealizado, userId]
                );
            }

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
        const userId = (req as any).user?.id; // ID del usuario autenticado
        const { id } = req.params;

        const [directorios]: any = await pool.query(`SELECT * FROM directorios WHERE id = ?`, [id]);
        if (directorios.length === 0) {
            res.status(404).json({ error: 'Directorio no encontrado' });
            return;
        }

        const directorio = directorios[0];

        const [result]: any = await pool.query(`DELETE FROM directorios WHERE id = ?`, [id]);

        if (result.affectedRows > 0) {
            // Log de eliminación
            const descripcion = `Se eliminó el directorio con ID: ${id}`;
            const cambioRealizado = `Extensión: ${directorio.extension}, Departamento ID: ${directorio.departamento_id}, Agencia ID: ${directorio.agencias_id}, Empleado: ${directorio.empleado}`;
            await pool.query(`INSERT INTO logs (descripcion, cambio_realizado, usuario_id) VALUES (?, ?, ?)`, [descripcion, cambioRealizado, userId]);

            res.status(200).json({ message: 'Directorio eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Directorio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el directorio' });
    }
};
 
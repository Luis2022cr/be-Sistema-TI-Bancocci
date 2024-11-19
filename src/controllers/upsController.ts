import { Request, Response } from 'express';
import pool from '../database/mysql';

// Obtener todas las UPS
export const getUps = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extraemos los posibles filtros desde los query params
        const { tipo_tamano_id } = req.query;

        // Base query
        let query = `
            SELECT u.id, u.nombre, u.modelo, u.direccion_ip, u.kva, u.fecha_instalacion, u.años_uso, u.proximo_cambio, u.modulos, u.baterias, u.observacion,
                   ag.nombre AS agencia, est.nombre AS estado_ups, tt.nombre AS tipo_tamano
            FROM ups u
            JOIN agencias ag ON u.agencias_id = ag.id
            JOIN estado_ups est ON u.estado_ups_id = est.id
            JOIN tipo_tamano tt ON u.tipo_tamano_id = tt.id
        `;

        // Array para los valores que pasaremos a la consulta
        const queryParams: any[] = [];

        // Si el tipo_tamano_id está presente, añadimos una cláusula WHERE
        if (tipo_tamano_id) {
            query += ` WHERE u.tipo_tamano_id = ?`;
            queryParams.push(tipo_tamano_id);  // Agregamos el valor a los parámetros
        }

        // Ejecutamos la consulta con los parámetros que tengamos
        const [ups] = await pool.query(query, queryParams);

        // Devolvemos los resultados
        res.status(200).json(ups);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las UPS' });
    }
};


// Obtener UPS por ID
export const getUpsById = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extraemos el ID de los parámetros de la solicitud
        const { id } = req.params;

        // Verificamos si el ID está presente
        if (!id) {
            res.status(400).json({ error: "El ID de la UPS es requerido" });
            return;
        }

        // Ejecutamos la consulta pasando el ID como parámetro
        const [ups]: any = await pool.query(`
                  SELECT 
                        u.id,
                        u.nombre ,
                        u.modelo,
                        u.direccion_ip,
                        u.kva,
                        u.fecha_instalacion,
                        u.años_uso,
                        u.proximo_cambio,
                        u.modulos,
                        u.baterias,
                        u.observacion,
                        
                        a.id AS agencia_id,
                        a.nombre AS agencia_nombre,

                        t.id AS tipo_tamano_id,
                        t.nombre AS tipo_tamano_nombre,

                        e.id AS estado_ups_id,
                        e.nombre AS estado_ups_nombre
                        
                    FROM 
                        ups u
                        LEFT JOIN agencias a ON u.agencias_id = a.id
                        LEFT JOIN tipo_tamano t ON u.tipo_tamano_id = t.id
                        LEFT JOIN estado_ups e ON u.estado_ups_id = e.id

                    WHERE 
                        u.id = ?;
        `, [id]);
      
        if (ups.length > 0) {
            res.status(200).json(ups[0]);
        } else {
            res.status(404).json({ error: 'Ups no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener la UPS por ID" });
    }
};


export const getUpsSelect = async (req: Request, res: Response): Promise<void> => {
    try {

        // Base query
        let query = `
            SELECT u.id, u.nombre
            FROM ups u
        `;

        // Ejecutamos la consulta con los parámetros que tengamos
        const [ups] = await pool.query(query);

        // Devolvemos los resultados
        res.status(200).json(ups);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las UPS' });
    }
};


// Obtener UPS por ID con historial de cambios
export const getUpsPorIdConHistorial = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // 1. Consulta para obtener los datos del UPS
        const [ups]: any = await pool.query(`
            SELECT u.id, u.nombre, u.modelo, u.direccion_ip, u.kva, u.fecha_instalacion, u.años_uso, u.proximo_cambio, u.modulos, u.baterias, u.observacion,
                   ag.nombre AS agencia, est.nombre AS estado_ups, tt.nombre AS tipo_tamano
            FROM ups u
            JOIN agencias ag ON u.agencias_id = ag.id
            JOIN estado_ups est ON u.estado_ups_id = est.id
            JOIN tipo_tamano tt ON u.tipo_tamano_id = tt.id
            WHERE u.id = ?
        `, [id]);

        if (ups.length === 0) {
            res.status(404).json({ error: 'UPS no encontrada' });
            return;
        }

        // 2. Consulta para obtener el historial de cambios del UPS
        const [historial]: any = await pool.query(`
            SELECT hc.cambio, hc.fecha_instalacion, hc.proximo_cambio
            FROM historial_cambio_ups hc
            WHERE hc.ups_id = ?
        `, [id]);

        // 3. Combinar la información del UPS con el historial de cambios
        const upsConHistorial = {
            ...ups[0],  // Información del UPS
            historial: historial  // Historial de cambios del UPS
        };

        // 4. Enviar la respuesta con los datos del UPS y su historial
        res.status(200).json(upsConHistorial);

    } catch (error) {
        console.error('Error al obtener la UPS con historial:', error);
        res.status(500).json({ error: 'Error al obtener la UPS con historial' });
    }
};


// Crear una nueva UPS
export const crearUps = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user?.id; // ID del usuario autenticado

    try {
        const { nombre, modelo, direccion_ip, kva, fecha_instalacion, años_uso, proximo_cambio, modulos, baterias, agencias_id, estado_ups_id, tipo_tamano_id, observacion } = req.body;

        // Validar que todos los campos estén presentes
        if (!nombre || !modelo || !kva || !fecha_instalacion || !años_uso || !proximo_cambio || !agencias_id || !estado_ups_id || !tipo_tamano_id) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar si el estado_ups_id y tipo_tamano_id existen
        const [estado]: any = await pool.query('SELECT id FROM estado_ups WHERE id = ?', [estado_ups_id]);
        const [tipoTamano]: any = await pool.query('SELECT id FROM tipo_tamano WHERE id = ?', [tipo_tamano_id]);

        if (estado.length === 0) {
            res.status(400).json({ error: 'El estado proporcionado no existe' });
            return;
        }

        if (tipoTamano.length === 0) {
            res.status(400).json({ error: 'El tipo de tamaño proporcionado no existe' });
            return;
        }

        // Si el estado y tipo de tamaño existen, proceder a crear la UPS
        await pool.query(`
            INSERT INTO ups (nombre, modelo, direccion_ip, kva, fecha_instalacion, años_uso, proximo_cambio, modulos, baterias, agencias_id, estado_ups_id, tipo_tamano_id, observacion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, modelo, direccion_ip, kva, fecha_instalacion, años_uso, proximo_cambio, modulos, baterias, agencias_id, estado_ups_id, tipo_tamano_id, observacion]
        );

        const descripcion = `Se creó un nuevo UPS: ${nombre}`;
        const cambioRealizado = `Nombre: ${nombre}, Modelo: ${modelo}, Direccion IP: ${direccion_ip}, KVA: ${kva}, Fecha Instalacion: ${fecha_instalacion}, Años Uso: ${años_uso}, Proximo Cambio: ${proximo_cambio}, Modulos: ${modulos}, Baterias: ${baterias}, Agencias Id: ${agencias_id}, Estado: ${estado_ups_id}, Tipo Tamaño: ${tipo_tamano_id}, Observacion: ${observacion}`;
        await pool.query(`INSERT INTO logs (descripcion, cambio_realizado, usuario_id) VALUES (?, ?, ?)`, [descripcion, cambioRealizado, userId]);

        res.status(201).json({ message: 'UPS creada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la UPS' });
    }
};

// Actualizar una UPS existente
export const actualizarUps = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user?.id; // ID del usuario autenticado

    try {
        const { id } = req.params;
        const { nombre, modelo, direccion_ip, kva, años_uso, modulos, baterias, agencias_id, estado_ups_id, tipo_tamano_id, observacion } = req.body;

        // Validar que todos los campos estén presentes
        if (!nombre || !modelo || !kva || !años_uso || !agencias_id || !estado_ups_id || !tipo_tamano_id) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Verificar si el estado_ups_id y tipo_tamano_id existen
        const [estado]: any = await pool.query('SELECT id FROM estado_ups WHERE id = ?', [estado_ups_id]);
        const [tipoTamano]: any = await pool.query('SELECT id FROM tipo_tamano WHERE id = ?', [tipo_tamano_id]);

        if (estado.length === 0) {
            res.status(400).json({ error: 'El estado proporcionado no existe' });
            return;
        }

        if (tipoTamano.length === 0) {
            res.status(400).json({ error: 'El tipo de tamaño proporcionado no existe' });
            return;
        }

        // Obtener la UPS actual para comparar cambios
        const [upsActual]: any = await pool.query('SELECT * FROM ups WHERE id = ?', [id]);
        if (upsActual.length === 0) {
            res.status(404).json({ error: 'UPS no encontrada' });
            return;
        }

        // Preparar registro de cambios
        const cambios = [];
        const ups = upsActual[0];

        if (nombre !== ups.nombre) cambios.push(`Nombre: ${ups.nombre} -> ${nombre}`);
        if (modelo !== ups.modelo) cambios.push(`Modelo: ${ups.modelo} -> ${modelo}`);
        if (direccion_ip !== ups.direccion_ip) cambios.push(`IP: ${ups.direccion_ip} -> ${direccion_ip}`);
        if (kva !== ups.kva) cambios.push(`KVA: ${ups.kva} -> ${kva}`);
        if (años_uso !== ups.años_uso) cambios.push(`Años uso: ${ups.años_uso} -> ${años_uso}`);
        if (modulos !== ups.modulos) cambios.push(`Módulos: ${ups.modulos} -> ${modulos}`);
        if (baterias !== ups.baterias) cambios.push(`Baterías: ${ups.baterias} -> ${baterias}`);
        if (agencias_id !== ups.agencias_id) cambios.push(`Agencia: ${ups.agencias_id} -> ${agencias_id}`);
        if (estado_ups_id !== ups.estado_ups_id) cambios.push(`Estado: ${ups.estado_ups_id} -> ${estado_ups_id}`);
        if (tipo_tamano_id !== ups.tipo_tamano_id) cambios.push(`Tipo tamaño: ${ups.tipo_tamano_id} -> ${tipo_tamano_id}`);
        if (observacion !== ups.observacion) cambios.push(`Observación: ${ups.observacion} -> ${observacion}`);

        // Si no hubo cambios, no actualizar
        if (cambios.length === 0) {
            res.status(400).json({ error: 'No se realizaron cambios' });
            return;
        }

        // Actualizar la UPS
        const [result]: any = await pool.query(`
            UPDATE ups
            SET nombre = ?, modelo = ?, direccion_ip = ?, kva = ?, años_uso = ?, modulos = ?, baterias = ?, agencias_id = ?, estado_ups_id = ?, tipo_tamano_id = ?, observacion = ?
            WHERE id = ?`,
            [nombre, modelo, direccion_ip, kva, años_uso, modulos, baterias, agencias_id, estado_ups_id, tipo_tamano_id, observacion, id]
        );

        if (result.affectedRows > 0) {
            const descripcion = `UPS actualizada: ${nombre}`;
            const cambioRealizado = cambios.join(', ');
            await pool.query(`INSERT INTO logs (descripcion, cambio_realizado, usuario_id) VALUES (?, ?, ?)`, [descripcion, cambioRealizado, userId]);

            res.status(200).json({ message: 'UPS actualizada exitosamente' });
        } else {
            res.status(404).json({ error: 'UPS no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la UPS' });
    }
};


// Eliminar (cambiar estado) una UPS
export const eliminarUps = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user?.id; // ID del usuario autenticado

    try {
        const { id } = req.params;

        // Verificar si la UPS existe antes de marcarla como inactiva
        const [upsActual]: any = await pool.query('SELECT nombre FROM ups WHERE id = ?', [id]);
        if (upsActual.length === 0) {
            res.status(404).json({ error: 'UPS no encontrada' });
            return;
        }

        const nombreUps = upsActual[0].nombre;

        // Cambiar estado a inactivo (asumiendo que estado_ups_id = 2 significa inactivo)
        const [result]: any = await pool.query('UPDATE ups SET estado_ups_id = 2 WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            const descripcion = `UPS marcada como inactiva: ${nombreUps}`;
            const cambioRealizado = `Estado cambiado a inactivo (ID: 2)`;
            await pool.query(`INSERT INTO logs (descripcion, cambio_realizado, usuario_id) VALUES (?, ?, ?)`, [descripcion, cambioRealizado, userId]);

            res.status(200).json({ message: 'UPS marcada como inactiva exitosamente' });
        } else {
            res.status(404).json({ error: 'UPS no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al inactivar la UPS' });
    }
};

//get para calendario:
export const getcalendarUPS = async (req: Request, res: Response): Promise<void> => {
    try {
        // Realizamos la consulta para obtener los datos
        const [rows] = await pool.query(`
            SELECT u.id, u.nombre AS ups, u.modelo, u.proximo_cambio,
                   ag.nombre AS agencia
            FROM ups u
            JOIN agencias ag ON u.agencias_id = ag.id
        `);

        // Si hay datos, los retornamos en la respuesta
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los UPS:', error);
        res.status(500).json({ error: 'Error al obtener los UPS' });
    }
};
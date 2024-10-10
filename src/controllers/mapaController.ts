import { Request, Response } from 'express';
import pool from '../database/mysql'; 
import ping from 'ping'; // Librería para hacer ping


// Obtener todas las UPS con detalles de ubicación y estado
export const getUpsMapa = async (req: Request, res: Response): Promise<void> => {
    try {
        // Consulta para obtener los detalles de las UPS y sus agencias
        const [upsMapa]: any = await pool.query(`
            SELECT um.id, um.lat, um.lon, um.estado, u.nombre AS nombre_ups, u.direccion_ip, u.kva, a.nombre AS agencia, a.codigo, a.ubicacion 
            FROM ups_Mapa um
            JOIN ups u ON um.ups_id = u.id
            JOIN agencias a ON u.agencias_id = a.id
        `);

        // Hacer ping a cada dirección IP y actualizar el estado de las UPS
        const upsMapaUpdated = await Promise.all(
            upsMapa.map(async (ups: any) => {
                const pingResponse = await ping.promise.probe(ups.direccion_ip);
                const nuevoEstado = pingResponse.alive ? 'online' : 'offline';

                // Actualizar el estado en la base de datos si ha cambiado
                if (ups.estado !== nuevoEstado) {
                    await pool.query(`
                        UPDATE ups_Mapa SET estado = ? WHERE id = ?
                    `, [nuevoEstado, ups.id]);
                }

                // Devolver la UPS con el estado actualizado
                return { ...ups, estado: nuevoEstado };
            })
        );

        // Devolvemos los resultados con el estado actualizado
        res.status(200).json(upsMapaUpdated);
    } catch (error) {
        console.error('Error al obtener las UPS:', error);
        res.status(500).json({ error: 'Error al obtener las UPS' });
    }
};

// Crear una nueva UPS Mapaa
export const createUpsMapa = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ups_id, lat, lon } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!ups_id || !lat || !lon) {
            res.status(400).json({ error: 'Todos los campos son obligatorios' });
            return;
        }

        // Insertar la nueva UPS Mapaa
        await pool.query(`
            INSERT INTO ups_Mapa (ups_id, lat, lon)
            VALUES (?, ?, ?)
        `, [ups_id, lat, lon]);

        res.status(201).json({ message: 'UPS Mapaa creada exitosamente' });
    } catch (error) {
        console.error('Error al crear la UPS Mapaa:', error);
        res.status(500).json({ error: 'Error al crear la UPS Mapaa' });
    }
};

// Eliminar una UPS Mapaa
export const deleteUpsMapa = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const [result]: any = await pool.query(`
            DELETE FROM ups_Mapa WHERE id = ?
        `, [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'UPS Mapaa eliminada exitosamente' });
        } else {
            res.status(404).json({ error: 'UPS Mapaa no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar la UPS Mapaa:', error);
        res.status(500).json({ error: 'Error al eliminar la UPS Mapaa' });
    }
};

// Hacer ping y actualizar el estado de la UPS Mapaa
// export const pingUps = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;

//         // Consulta para obtener la dirección IP de la UPS
//         const [ups]: any = await pool.query(`
//             SELECT u.direccion_ip FROM ups u
//             JOIN ups_Mapaa um ON um.ups_id = u.id
//             WHERE um.id = ?
//         `, [id]);

//         if (ups.length === 0) {
//             res.status(404).json({ error: 'UPS no encontrada' });
//             return;
//         }

//         const direccion_ip = ups[0].direccion_ip;

//         // Hacer ping a la dirección IP de la UPS
//         const pingResponse = await ping.promise.probe(direccion_ip);

//         // Determinar el estado (online/offline) basado en la respuesta del ping
//         const nuevoEstado = pingResponse.alive ? 'online' : 'offline';

//         // Actualizar el estado en la base de datos
//         await pool.query(`
//             UPDATE ups_Mapaa SET estado = ? WHERE id = ?
//         `, [nuevoEstado, id]);

//         res.status(200).json({ message: `UPS actualizada a estado: ${nuevoEstado}` });
//     } catch (error) {
//         console.error('Error al hacer ping a la UPS:', error);
//         res.status(500).json({ error: 'Error al hacer ping a la UPS' });
//     }
// };

import { Request, Response } from 'express';
import pool from '../database/mysql';

// Endpoint para obtener notificaciones
export const getNotificacionesUps = async (req: Request, res: Response): Promise<void> => {
    try {
        
        await pool.query("SET lc_time_names = 'es_ES'");
        
        // Consulta para obtener las UPS cuya fecha de próximo cambio esté en los intervalos de tiempo especificados
        const [notificaciones]: any = await pool.query(`
           
            SELECT u.id, u.nombre AS modelo, ag.nombre AS agencia, u.proximo_cambio,
            DATE_FORMAT(u.proximo_cambio, '%d/%M/%Y') AS proximo_cambio,
            DATEDIFF(u.proximo_cambio, CURDATE()) AS dias_restantes
            FROM ups u
            JOIN agencias ag ON u.agencias_id = ag.id
            WHERE DATEDIFF(u.proximo_cambio, CURDATE()) IN (3, 7, 15, 30, 90)
           
        `);

        if (notificaciones.length === 0) {
            res.status(200).json([]);  // No hay notificaciones
            return;
        }

        // Procesar las notificaciones basadas en los días restantes
        const result = notificaciones.map((notificacion: any) => {
            let message = '';
            const { dias_restantes, modelo, agencia, proximo_cambio } = notificacion;

            if (dias_restantes <= 3) {
                message = `El UPS Modelo "${modelo}" de la Agencia "${agencia}", necesita cambio en ${dias_restantes} día${dias_restantes === 1 ? '' : 's'} (${proximo_cambio}).`;
            } else if (dias_restantes <= 7) {
                message = `El UPS Modelo "${modelo}" de la Agencia "${agencia}", necesita cambio en ${dias_restantes} días (${proximo_cambio}).`;
            } else if (dias_restantes <= 15) {
                message = `El UPS Modelo "${modelo}" de la Agencia "${agencia}", necesita cambio en ${dias_restantes} días (${proximo_cambio}).`;
            } else if (dias_restantes <= 30) {
                message = `El UPS Modelo "${modelo}" de la Agencia "${agencia}", necesita cambio en 1 mes (${proximo_cambio}).`;
            } else if (dias_restantes <= 90) {
                message = `El UPS Modelo "${modelo}" de la Agencia "${agencia}", necesita cambio en 3 meses (${proximo_cambio}).`;
            }

            return {
                id: notificacion.id,
                message,
                time: `${dias_restantes} días restantes para el cambio`
            };
        });

        // Enviar las notificaciones como respuesta
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ error: 'Error al obtener notificaciones' });
    }
};

// Endpoint para verificar si hay notificaciones
export const checkNotificacionesUps = async (req: Request, res: Response): Promise<void> => {
    try {
        // Establece los nombres de los meses en español (esto debe hacerse en una consulta separada)
        await pool.query("SET lc_time_names = 'es_ES'");

        // Consulta para verificar si hay UPS con fechas próximas de cambio dentro de los 90 días
        const [notificaciones]: any = await pool.query(`
            SELECT COUNT(*) AS total
            FROM ups u
            WHERE DATEDIFF(u.proximo_cambio, CURDATE()) IN (3, 7, 15, 30, 90)
            AND u.proximo_cambio > CURDATE()
        `);

        // Si el conteo es mayor a 0, significa que hay notificaciones
        const hayNotificaciones = notificaciones[0].total > 0;

        // Devuelve true si hay notificaciones, false en caso contrario
        res.status(200).json({ hayNotificaciones });
    } catch (error) {
        console.error('Error al verificar notificaciones:', error);
        res.status(500).json({ error: 'Error al verificar notificaciones' });
    }
};

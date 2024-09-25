import { Connection } from 'mysql2/promise';

// Función para insertar nombres en detalle_solicitud si no existen
export const insertDetalleSolicitudIfNotExists = async (connection: Connection) => {
  // Nombres que queremos verificar e insertar
  const nombresToCheck = [
    'Equipo para Reparación', 
    'Cambio de Equipo', 
    'Entrega de Equipo', 
    'Entrega de Equipo Prestado',
    'Devolución de Equipo Prestado',
    'Entrega de Equipo Reparado',
    'Otros'
  ];

  // Verificar cuántos de los nombres ya existen
  const checkNombresSQL = `
    SELECT COUNT(*) as count FROM detalle_solicitud WHERE nombre IN (${nombresToCheck.map(() => '?').join(', ')});
  `;

  // Ejecutar consulta para verificar los nombres existentes
  const [rows]:any = await connection.query(checkNombresSQL, nombresToCheck);

  // Si no hay nombres existentes, proceder a insertarlos
  if (rows[0].count === 0) {
    const insertNombresSQL = `
      INSERT INTO detalle_solicitud (nombre) VALUES 
      ${nombresToCheck.map(() => '(?)').join(', ')};
    `;

    await connection.query(insertNombresSQL, nombresToCheck);
    console.log('Nombres insertados en detalle_solicitud:', nombresToCheck);
  } else {
    console.log('Algunos nombres ya existen en detalle_solicitud, no se realizará la inserción.');
  }
};

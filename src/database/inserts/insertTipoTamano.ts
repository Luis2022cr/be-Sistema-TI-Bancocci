import { Connection } from 'mysql2/promise';

// Función para insertar tipos de tamaños solo si no existen
export const insertTipoTamanoIfNotExists = async (connection: Connection) => {
  // Tipos de tamaño que queremos verificar e insertar
  const tamanosToCheck = ['pequeño', 'grande'];

  // Verificar cuántos de los tamaños ya existen
  const checkTamanoSQL = `
    SELECT COUNT(*) as count FROM tipo_tamano WHERE nombre IN (${tamanosToCheck.map(() => '?').join(', ')});
  `;

  // Ejecutar consulta para verificar tamaños existentes
  const [rows]: any = await connection.query(checkTamanoSQL, tamanosToCheck);

  // Si no hay tamaños existentes, proceder a insertarlos
  if (rows[0].count === 0) {
    const insertTamanoSQL = `
      INSERT INTO tipo_tamano (nombre) VALUES 
      ${tamanosToCheck.map(() => '(?)').join(', ')};
    `;

    await connection.query(insertTamanoSQL, tamanosToCheck);
    console.log('Tipos de tamaño insertados:', tamanosToCheck);
  } else {
    console.log('Algunos tipos de tamaño ya existen, no se realizará la inserción.');
  }
};

import { Connection } from 'mysql2/promise';

// Función para insertar marcas solo si no existen
export const insertMarcaIfNotExists = async (connection: Connection) => {
  // Marcas que queremos verificar e insertar
  const marcasToCheck = ['DELL', 'HP', 'EPSON', 'AVAYA', 'OLIVETTI'];

  // Verificar cuántas de las marcas ya existen
  const checkMarcasSQL = `
    SELECT COUNT(*) as count FROM marca WHERE nombre IN (${marcasToCheck.map(() => '?').join(', ')});
  `;

  // Ejecutar consulta para verificar las marcas existentes
  const [rows]: any = await connection.query(checkMarcasSQL, marcasToCheck);

  // Si no hay marcas existentes, proceder a insertarlas
  if (rows[0].count === 0) {
    const insertMarcasSQL = `
      INSERT INTO marca (nombre) VALUES 
      ${marcasToCheck.map(() => '(?)').join(', ')};
    `;

    await connection.query(insertMarcasSQL, marcasToCheck);
    console.log('Marcas insertadas en la tabla marca:', marcasToCheck);
  } else {
    console.log('Algunas marcas ya existen en la tabla marca, no se realizará la inserción.');
  }
};

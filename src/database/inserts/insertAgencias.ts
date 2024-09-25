import { Connection } from 'mysql2/promise';

// Función para insertar agencias solo si no existen
export const insertAgencias = async (connection: Connection) => {
  // Nombres de las agencias que queremos insertar
  const agenciasToInsert = [
    ['Agencia Principal', 'SRC', '101', 1],
    ['Agencia Terminal', 'SRC', '102', 1],
    ['Agencia Santa Teresa', 'SRC', '103', 1],
    ['Agencia Uniplaza', 'SRC', '104', 1],
    ['Agencia Parque Central', 'SRC', '105', 1], 
  ];

  // Crear una lista de nombres de agencias para la verificación
  const nombresAgencias = agenciasToInsert.map(agencia => agencia[0]);

  // Consulta para contar cuántas de las agencias ya existen
  const checkAgenciasSQL = `
    SELECT COUNT(*) as count FROM agencias WHERE nombre IN (${nombresAgencias.map(() => '?').join(', ')});
  `;
  const [rows]: any = await connection.query(checkAgenciasSQL, nombresAgencias);

  // Si no hay agencias existentes, proceder a insertarlas
  if (rows[0].count === 0) {
    const insertAgenciasSQL = `
      INSERT INTO agencias (nombre, ubicacion, codigo, estado_agencias_id) VALUES 
      ${agenciasToInsert.map(() => '(?, ?, ?, ?)').join(', ')};
    `;
    
    // Aplanar el array para que se ajuste a los parámetros de la consulta
    const params = agenciasToInsert.flat();
    await connection.query(insertAgenciasSQL, params);
    console.log('Agencias insertadas:', nombresAgencias);
  } else {
    console.log('Algunas agencias ya existen, no se realizará la inserción.');
  }
};

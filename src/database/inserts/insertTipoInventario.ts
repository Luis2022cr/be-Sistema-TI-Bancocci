import { Connection } from 'mysql2/promise';

// Función para insertar tipos de inventario solo si no existen
export const insertTipoInventarioIfNotExists = async (connection: Connection) => {
  // Tipos de inventario que queremos verificar e insertar
  const nombresToCheck = [
    'Desktop', 
    'Laptop', 
    'Impresora', 
    'Impresora Financiera', 
    'Teléfono', 
    'Planta', 
    'Monitor', 
    'Proyector', 
    'Otros'
  ];

  // Verificar cuántos de los nombres ya existen
  const checkNombresSQL = `
    SELECT COUNT(*) as count FROM tipo_inventario WHERE nombre IN (${nombresToCheck.map(() => '?').join(', ')});
  `;

  // Ejecutar consulta para verificar los nombres existentes
  const [rows]: any = await connection.query(checkNombresSQL, nombresToCheck);

  // Si no hay nombres existentes, proceder a insertarlos
  if (rows[0].count === 0) {
    const insertNombresSQL = `
      INSERT INTO tipo_inventario (nombre) VALUES 
      ${nombresToCheck.map(() => '(?)').join(', ')};
    `;

    await connection.query(insertNombresSQL, nombresToCheck);
    console.log('Nombres insertados en tipo_inventario:', nombresToCheck);
  } else {
    console.log('Algunos nombres ya existen en tipo_inventario, no se realizará la inserción.');
  }
};

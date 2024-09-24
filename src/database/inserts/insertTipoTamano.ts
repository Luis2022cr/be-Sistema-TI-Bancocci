import { Connection } from 'mysql2/promise';

// Función para insertar tipos de tamaños si no existen
export const insertTipoTamanoIfNotExists = async (connection: Connection) => {
  // Verificar qué tamaños existen
  const checkTamanoSQL = `
    SELECT nombre FROM tipo_tamano WHERE nombre IN ('pequeño', 'grande');
  `;

  // Ejecutar consulta para verificar tamaños existentes
  const [existingTamanos]: any = await connection.query(checkTamanoSQL);

  // Crear una lista de los tamaños que faltan
  const existingTamanoList = existingTamanos.map((tamano: any) => tamano.nombre);

  const tamanosToInsert = [];

  if (!existingTamanoList.includes('pequeño')) {
    tamanosToInsert.push('pequeño');
  }

//   if (!existingTamanoList.includes('mediano')) {
//     tamanosToInsert.push('mediano');
//   }

  if (!existingTamanoList.includes('grande')) {
    tamanosToInsert.push('grande');
  }

  // Insertar solo los tamaños faltantes
  if (tamanosToInsert.length > 0) {
    const insertTamanoSQL = `
      INSERT INTO tipo_tamano (nombre) VALUES ${tamanosToInsert.map(() => '(?)').join(', ')};
    `;
    await connection.query(insertTamanoSQL, tamanosToInsert);
    console.log('Tipos de tamaño insertados:', tamanosToInsert);
  } else {
    console.log('Todos los tipos de tamaño existen.');
  }
};

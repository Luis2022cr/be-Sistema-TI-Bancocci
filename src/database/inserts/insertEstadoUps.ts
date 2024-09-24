import { Connection } from 'mysql2/promise';

// Función para insertar los estados de agencia
export const insertEstadoUpsIfNotExists = async (connection: Connection) => {
  // Verificar qué estados existen
  const checkEstadosSQL = `
    SELECT nombre FROM estado_ups WHERE nombre IN ('activo', 'prestado', 'inactivo');
  `;

  // Ejecutar consulta para verificar los estados existentes
  const [existingEstados]: any = await connection.query(checkEstadosSQL);

  // Crear una lista de los estados que faltan
  const existingEstadosList = existingEstados.map((estado: any) => estado.nombre);

  const estadosToInsert = [];

  if (!existingEstadosList.includes('activo')) {
    estadosToInsert.push('activo');
  }

  if (!existingEstadosList.includes('inactivo')) {
    estadosToInsert.push('inactivo');
  }

  if (!existingEstadosList.includes('prestado')) {
    estadosToInsert.push('prestado');
  }

  // Insertar solo los estados faltantes
  if (estadosToInsert.length > 0) {
    const insertEstadosSQL = `
      INSERT INTO estado_ups (nombre) VALUES ${estadosToInsert.map(() => '(?)').join(', ')};
    `;
    await connection.query(insertEstadosSQL, estadosToInsert);
    console.log('Estados de ups insertados:', estadosToInsert);
  } else {
    console.log('Todos los estados de ups ya existen.');
  }
};

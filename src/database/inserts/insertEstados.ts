import { Connection } from 'mysql2/promise';

// Función para insertar los estados de agencia
export const insertEstadoIfNotExists = async (connection: Connection) => {
  // Verificar qué estados existen
  const checkEstadosSQL = `
    SELECT nombre FROM estado WHERE nombre IN ('reparado', 'mantenimiento', 'reparacion', 'malo');
  `;

  // Ejecutar consulta para verificar los estados existentes
  const [existingEstados]: any = await connection.query(checkEstadosSQL);

  // Crear una lista de los estados que faltan
  const existingEstadosList = existingEstados.map((estado: any) => estado.nombre);

  const estadosToInsert = [];

  if (!existingEstadosList.includes('reparado')) {
    estadosToInsert.push('reparado');
  }

  if (!existingEstadosList.includes('mantenimiento')) {
    estadosToInsert.push('mantenimiento');
  }

  if (!existingEstadosList.includes('reparacion')) {
    estadosToInsert.push('reparacion');
  }

  if (!existingEstadosList.includes('malo')) {
    estadosToInsert.push('malo');
  }

  // Insertar solo los estados faltantes
  if (estadosToInsert.length > 0) {
    const insertEstadosSQL = `
      INSERT INTO estado (nombre) VALUES ${estadosToInsert.map(() => '(?)').join(', ')};
    `;
    await connection.query(insertEstadosSQL, estadosToInsert);
    console.log('Estados de invetarios insertados:', estadosToInsert);
  } else {
    console.log('Todos los estados de inventarios ya existen.');
  }
};

import { Connection } from 'mysql2/promise';

// Función para insertar departamentos solo si no existen
export const insertDepartamentos = async (connection: Connection) => {
  // Nombres de los departamentos que queremos insertar
  const departamentosToInsert = ['TI', 'Atencion al cliente', 'Recursos humanos', 'Caja'];

  // Consulta para contar cuántos de los departamentos ya existen
  const checkDepartamentosSQL = `
    SELECT COUNT(*) as count FROM departamentos WHERE nombre IN (${departamentosToInsert.map(() => '?').join(', ')});
  `;
  const [rows]:any = await connection.query(checkDepartamentosSQL, departamentosToInsert);

  // Si no hay departamentos existentes, proceder a insertarlos
  if (rows[0].count === 0) {
    const insertDepartamentosSQL = `
      INSERT INTO departamentos (nombre) VALUES 
      ${departamentosToInsert.map(() => '(?)').join(', ')};
    `;
    await connection.query(insertDepartamentosSQL, departamentosToInsert);
    console.log('Departamentos insertados:', departamentosToInsert);
  } else {
    console.log('Algunos departamentos ya existen, no se realizará la inserción.');
  }
};

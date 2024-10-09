import { Connection } from 'mysql2/promise';

// Función para insertar los datos en la tabla tecnico solo si no existen
export const insertTecnicos = async (connection: Connection) => {
  // Datos de los técnicos para insertar en la tabla tecnico
  const tecnicos = [
    { nombre: 'Victor Josue Dubon', numero_identidad: 100050, estado_id: 1 },   // Jefe de Taller
    { nombre: 'Nicky Josue Ramos', numero_identidad: 100051, estado_id: 1 },    // Taller 1
    { nombre: 'Alan Flores Delcil', numero_identidad: 100052, estado_id: 1 },   // Taller 2
    { nombre: 'Jenry Alberto Castellanos', numero_identidad: 100053, estado_id: 1 } // Taller 3
  ];

  // Crear una lista de los números de identidad de los técnicos
  const numeroIdentidades = tecnicos.map(tecnico => tecnico.numero_identidad);

  // Verificar cuántos de los técnicos ya existen
  const checkTecnicosSQL = `
    SELECT COUNT(*) as count FROM tecnico WHERE numero_identidad IN (${numeroIdentidades.map(() => '?').join(', ')});
  `;

  // Ejecutar consulta para verificar los técnicos existentes
  const [rows]: any = await connection.query(checkTecnicosSQL, numeroIdentidades);

  // Si no hay técnicos existentes, proceder a insertarlos
  if (rows[0].count === 0) {
    const insertTecnicosSQL = `
      INSERT INTO tecnico (nombre, numero_identidad, estado_id) VALUES 
      ${tecnicos.map(() => '(?, ?, ?)').join(', ')};
    `;

    // Extraer los valores de nombre, numero_identidad y estado_id para la inserción
    const insertValues = tecnicos.flatMap(tecnico => [tecnico.nombre, tecnico.numero_identidad, tecnico.estado_id]);

    await connection.query(insertTecnicosSQL, insertValues);
    console.log('Técnicos insertados:', tecnicos.map(t => t.nombre));
  } else {
    console.log('Algunos técnicos ya existen, no se realizará la inserción.');
  }
};

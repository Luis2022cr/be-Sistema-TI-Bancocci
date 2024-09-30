import { Connection } from "mysql2/promise";

// Función para insertar los datos en la tabla tecnico
export const insertTecnicos = async (connection: Connection) => {
    // Datos de los técnicos para insertar en la tabla tecnico
    const tecnicos = [
      { nombre: 'Victor Josue Dubon', numero_identidad: 100050, estado_id: 1 },   // Jefe de Taller
      { nombre: 'Nicky Josue Ramos', numero_identidad: 100051, estado_id: 1 },    // Taller 1
      { nombre: 'Alan Flores Delcil', numero_identidad: 100052, estado_id: 1 },   // Taller 2
      { nombre: 'Jenry Alberto Castellanos', numero_identidad: 100053, estado_id: 1 } // Taller 3
    ];
  
    // Insertar los técnicos
    for (const { nombre, numero_identidad, estado_id } of tecnicos) {
      // Verificar si ya existe el técnico en la tabla
      const checkTecnicoSQL = `
        SELECT COUNT(*) as count FROM tecnico WHERE numero_identidad = ?;
      `;
      const [checkRows]: any = await connection.query(checkTecnicoSQL, [numero_identidad]);
  
      // Si no existe, insertar el nuevo técnico
      if (checkRows[0].count === 0) {
        const insertTecnicoSQL = `
          INSERT INTO tecnico (nombre, numero_identidad, estado_id) 
          VALUES (?, ?, ?);
        `;
        await connection.query(insertTecnicoSQL, [nombre, numero_identidad, estado_id]);
        console.log(`Técnico insertado: ${nombre} con número de identidad ${numero_identidad}`);
      } else {
        console.log(`El técnico con número de identidad ${numero_identidad} ya existe, no se realizará la inserción.`);
      }
    }
  };
  
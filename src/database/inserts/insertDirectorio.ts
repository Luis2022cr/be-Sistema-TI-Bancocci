import { Connection } from 'mysql2/promise';

// Función para insertar los datos en la tabla directorios
export const insertDirectorios = async (connection: Connection) => {
  // Datos para insertar en la tabla directorios
  const directorios = [
    { extension: 100003, departamento_id: 31, agencias_id: 2, empleado: 'Mario Belarmino Contreras' },    // Gerente Regional TI - Zona Occidente
    { extension: 100036, departamento_id: 83, agencias_id: 2, empleado: 'Jose Raul Trochez Garcia' },      // Administración de Telefonía
    { extension: 100040, departamento_id: 28, agencias_id: 2, empleado: 'Roberto Josue Perdomo' },         // Jefe Soporte Técnico
    { extension: 100041, departamento_id: 28, agencias_id: 2, empleado: 'Emnio Josue Ramos' },              // Soporte Técnico 1
    { extension: 100042, departamento_id: 28, agencias_id: 2, empleado: 'Daniel Arnulfo Casasola' },       // Soporte Técnico 2
    { extension: 100050, departamento_id: 27, agencias_id: 2, empleado: 'Victor Josue Dubon' },             // Jefe de Taller
    { extension: 100051, departamento_id: 27, agencias_id: 2, empleado: 'Nicky Josue Ramos' },              // Taller 1
    { extension: 100052, departamento_id: 27, agencias_id: 2, empleado: 'Alan' },                           // Taller 2
    { extension: 100053, departamento_id: 27, agencias_id: 2, empleado: 'Jenry Alberto Castellanos' },     // Taller 3
    { extension: 100061, departamento_id: 29, agencias_id: 2, empleado: 'Maria Judith Miranda' },           // Usuarios Expertos
    { extension: 100530, departamento_id: 16, agencias_id: 2, empleado: 'TI' },                             // Sala de Reuniones
    { extension: 100019, departamento_id: 84, agencias_id: 2, empleado: 'TI' },                             // Sala de Capacitaciones
    { extension: 100010, departamento_id: 26, agencias_id: 2, empleado: 'TI' },                             // NOC
    { extension: 100542, departamento_id: 17, agencias_id: 2, empleado: 'TI' }                              // Cafetería
  ];

  for (const { extension, departamento_id, agencias_id, empleado } of directorios) {
    // Verificar si ya existe el directorio
    const checkDirectorioSQL = `
      SELECT COUNT(*) as count FROM directorios WHERE extension = ? AND departamento_id = ?;
    `;
    const [checkRows]: any = await connection.query(checkDirectorioSQL, [extension, departamento_id]);

    // Si no existe, insertar el nuevo directorio
    if (checkRows[0].count === 0) {
      const insertDirectorioSQL = `
        INSERT INTO directorios (extension, departamento_id, agencias_id, empleado) 
        VALUES (?, ?, ?, ?);
      `;
      await connection.query(insertDirectorioSQL, [extension, departamento_id, agencias_id, empleado]);
      console.log(`Directorio insertado: ${empleado} con extensión ${extension}`);
    } else {
      console.log(`El directorio con extensión ${extension} ya existe, no se realizará la inserción.`);
    }
  }
};

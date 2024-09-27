import { Connection } from 'mysql2/promise';

// Función para insertar los datos en la tabla directorios
export const insertDirectorios = async (connection: Connection) => {
  // Datos para insertar en la tabla directorios
  const directorios = [
    { extension: 100003, departamento_id: 31, agencias_id: 4, empleado: 'Mario Belarmino Contreras' },    // Gerente Regional TI - Zona Occidente
    { extension: 100036, departamento_id: 83, agencias_id: 4, empleado: 'Jose Raul Trochez Garcia' },      // Administración de Telefonía
    { extension: 100040, departamento_id: 28, agencias_id: 4, empleado: 'Roberto Josue Perdomo' },         // Jefe Soporte Técnico
    { extension: 100041, departamento_id: 28, agencias_id: 4, empleado: 'Emnio Josue Ramos' },              // Soporte Técnico 1
    { extension: 100042, departamento_id: 28, agencias_id: 4, empleado: 'Daniel Arnulfo Casasola' },       // Soporte Técnico 2
    { extension: 100050, departamento_id: 27, agencias_id: 4, empleado: 'Victor Josue Dubon' },             // Jefe de Taller
    { extension: 100051, departamento_id: 27, agencias_id: 4, empleado: 'Nicky Josue Ramos' },              // Taller 1
    { extension: 100052, departamento_id: 27, agencias_id: 4, empleado: 'Alan Delcil Flores' },            // Taller 2
    { extension: 100053, departamento_id: 27, agencias_id: 4, empleado: 'Jenry Alberto Castellanos' },     // Taller 3
    { extension: 100061, departamento_id: 29, agencias_id: 4, empleado: 'Maria Judith Miranda' },           // Usuarios Expertos
    { extension: 100530, departamento_id: 16, agencias_id: 4, empleado: 'TI' },                             // Sala de Reuniones
    { extension: 100019, departamento_id: 84, agencias_id: 4, empleado: 'TI' },                             // Sala de Capacitaciones
    { extension: 100010, departamento_id: 26, agencias_id: 4, empleado: 'TI' },                             // NOC
    { extension: 100542, departamento_id: 17, agencias_id: 4, empleado: 'TI' }                              // Cafetería
  ];

  // Extraer todas las extensiones
  const extensions = directorios.map(({ extension }) => extension);

  // Verificar si alguna de las extensiones ya existe
  const checkDirectorioSQL = `
    SELECT COUNT(*) as count FROM directorios WHERE extension IN (${extensions.map(() => '?').join(', ')});
  `;
  
  // Ejecutar la consulta de verificación
  const [checkRows]: any = await connection.query(checkDirectorioSQL, extensions);

  // Si existe al menos un directorio, cancelar inserción
  if (checkRows[0].count > 0) {
    console.log(`Ya existe al menos un directorio con alguna de las extensiones proporcionadas. No se realizará la inserción.`);
    return;
  }

  // Si no existen, insertar todos los directorios
  const insertDirectorioSQL = `
    INSERT INTO directorios (extension, departamento_id, agencias_id, empleado) 
    VALUES (?, ?, ?, ?);
  `;

  try {
    for (const { extension, departamento_id, agencias_id, empleado } of directorios) {
      await connection.query(insertDirectorioSQL, [extension, departamento_id, agencias_id, empleado]);
      console.log(`Directorio insertado: ${empleado} con extensión ${extension}`);
    }
  } catch (error) {
    console.error('Error al insertar los directorios:', error);
  }
};
 
import { Connection } from 'mysql2/promise';

// Función para insertar los datos en la tabla directorios
export const insertDirectorios = async (connection: Connection) => {
  // Datos para insertar en la tabla directorios
  const directorios = [
    { extension: 100003, departamento_id: 33, agencias_id: 5, empleado: 'Mario Belarmino Contreras' }, // Gerente Regional TI - Zona Occidente
    { extension: 100036, departamento_id: 85, agencias_id: 5, empleado: 'Jose Raul Trochez Garcia' },   // Administración de Telefonía
    { extension: 100040, departamento_id: 29, agencias_id: 5, empleado: 'Roberto Josue Perdomo' },      // Jefe Soporte Técnico
    { extension: 100041, departamento_id: 30, agencias_id: 5, empleado: 'Emnio Josue Ramos' },          // Soporte Técnico 1
    { extension: 100042, departamento_id: 30, agencias_id: 5, empleado: 'Daniel Arnulfo Casasola' },    // Soporte Técnico 2
    { extension: 100050, departamento_id: 27, agencias_id: 5, empleado: 'Victor Josue Dubon' },         // Jefe de Taller
    { extension: 100051, departamento_id: 28, agencias_id: 5, empleado: 'Nicky Josue Ramos' },          // Taller 1
    { extension: 100052, departamento_id: 28, agencias_id: 5, empleado: 'Alan Flores Delcil' },        // Taller 2
    { extension: 100053, departamento_id: 28, agencias_id: 5, empleado: 'Jenry Alberto Castellanos' },   // Taller 3
    { extension: 100061, departamento_id: 31, agencias_id: 5, empleado: 'Maria Judith Miranda' },        // Usuarios Expertos
    { extension: 100530, departamento_id: 16, agencias_id: 5, empleado: 'TI' },                         // Sala de Reuniones
    { extension: 100019, departamento_id: 86, agencias_id: 5, empleado: 'TI' },                         // Sala de Capacitaciones
    { extension: 100010, departamento_id: 26, agencias_id: 5, empleado: 'TI' },                         // NOC
    { extension: 100542, departamento_id: 17, agencias_id: 5, empleado: 'TI' },                         // Cafetería
    // Nuevos datos a insertar
    { extension: 111001, departamento_id: 1, agencias_id: 4, empleado: 'ANGEL ANTONIO TABORA TABORA' }, // GERENCIA
    { extension: 111012, departamento_id: 4, agencias_id: 4, empleado: 'OSCAR ARMANDO TABORA GOMEZ' }, // SUPERVISOR DE CAJA
    { extension: 111013, departamento_id: 4, agencias_id: 4, empleado: 'JOSE LUIS HERNANDEZ PERDOMO' }, // SUPERVISOR DE CAJA
    { extension: 111014, departamento_id: 4, agencias_id: 4, empleado: 'JOSUE DANIEL ZALDIVAR RODRIGUEZ' }, // SUPERVISOR DE CAJA AUTOBANCO
    { extension: 111015, departamento_id: 5, agencias_id: 4, empleado: 'ALLAN OMAR FLORES DELCID' },    // BOVEDA DE CAJA
    { extension: 111021, departamento_id: 6, agencias_id: 4, empleado: 'JENNY MARLEN CASTELLANOS' },    // ATENCIÓN AL CLIENTE No. 1
    { extension: 111022, departamento_id: 6, agencias_id: 4, empleado: 'NERISSA ALEJANDRA CABALLERO PINEDA' }, // ATENCIÓN AL CLIENTE No. 2
    { extension: 111540, departamento_id: 17, agencias_id: 4, empleado: 'MARIA SANTOS TEJADA' },        // CAFETERIA PRIMER NIVEL
    { extension: 111390, departamento_id: 82, agencias_id: 4, empleado: 'GLENDA LEMUS' },               // ASISTENTE REGIONAL CONTROL INTERNO
    { extension: 111391, departamento_id: 82, agencias_id: 4, empleado: 'MIRIAN MERCADO' },             // AUXILIAR CONTROL INTERNO
    { extension: 111392, departamento_id: 82, agencias_id: 4, empleado: 'MIRIAN NOHEMY CRUZ' },        // AUXILIAR CONTROL INTERNO
    { extension: 111393, departamento_id: 82, agencias_id: 4, empleado: 'IRMA HONORIA MELGAR' },       // AUXILIAR CONTROL INTERNO
    { extension: 111394, departamento_id: 82, agencias_id: 4, empleado: 'REINA ISABEL MADRID' },       // AUXILIAR CONTROL INTERNO
    { extension: 111395, departamento_id: 82, agencias_id: 4, empleado: 'NORMA HERNANDEZ MARTINEZ' },  // AUXILIAR CONTROL INTERNO
    { extension: 111396, departamento_id: 82, agencias_id: 4, empleado: 'VILMA ISABEL GARCIA' },      // AUXILIAR CONTROL INTERNO
    { extension: 111397, departamento_id: 82, agencias_id: 4, empleado: 'LESLIE ELIZABETH CHINCHILLA MEJIA' }, // AUXILIAR CONTROL INTERNO
    { extension: 111398, departamento_id: 82, agencias_id: 4, empleado: 'SILVIA VANESSA ALBERTO' },   // AUXILIAR CONTROL INTERNO
    { extension: 111399, departamento_id: 82, agencias_id: 4, empleado: 'MARIA LUISA DIAZ' },         // AUXILIAR CONTROL INTERNO
    { extension: 111310, departamento_id: 51, agencias_id: 4, empleado: 'José Fausto Orellana Córdova' }, // Auditor Interno Corporativo
    { extension: 111311, departamento_id: 51, agencias_id: 4, empleado: 'Edgar Abraham Ayala' },       // Asistente Auditor Interno Corporativo
    { extension: 111312, departamento_id: 51, agencias_id: 4, empleado: 'Roy A. Mejía' },             // Asistente Jefe Regional Auditoría Interna
    { extension: 111313, departamento_id: 51, agencias_id: 4, empleado: 'Sobeida Y. Valenzuela' },    // Asistente Administrativo
    { extension: 111314, departamento_id: 51, agencias_id: 4, empleado: 'José Angel Hernández F.' },   // Auditor
    { extension: 111315, departamento_id: 51, agencias_id: 4, empleado: 'Wendy Lisseth Sanabria' },    // Auditor Financiero/Riesgo
    { extension: 111316, departamento_id: 51, agencias_id: 4, empleado: 'Omar Alexánder Hernández' },  // Auditor Financiero/Riesgo
    { extension: 111317, departamento_id: 51, agencias_id: 4, empleado: 'Dennis Fernando Casaca' },    // Auditor de Sucursales y Agencias
    { extension: 111318, departamento_id: 51, agencias_id: 4, empleado: 'Francisco Javier Mejía' },    // Auditor de Sucursales y Agencias
    { extension: 111319, departamento_id: 51, agencias_id: 4, empleado: 'Oscar Arnaldo García P.' },   // Auditor Financiero/Riesgo
    { extension: 111320, departamento_id: 51, agencias_id: 4, empleado: 'Julissa Mercedes Escobar' },  // Auditor de Sucursales y Agencias
    { extension: 111541, departamento_id: 17, agencias_id: 4, empleado: 'TI' },                       // Cafetería II planta
    { extension: 111512, departamento_id: 51, agencias_id: 4, empleado: 'Erick Mauricio Castillo' },   // Jefe de Video Seguridad
    { extension: 111513, departamento_id: 51, agencias_id: 4, empleado: 'Marlon Brando Torres Servellon' }, // Auxiliar 1
    { extension: 111514, departamento_id: 51, agencias_id: 4, empleado: 'Luis Fernandos Santos' },      // Auxiliar 2
    { extension: 111515, departamento_id: 51, agencias_id: 4, empleado: 'Luis Edgardo Garcia' },       // Auxiliar 3
    { extension: 111516, departamento_id: 51, agencias_id: 4, empleado: 'Cristian Enamorado' },       // Auxiliar 4
    { extension: 111330, departamento_id: 51, agencias_id: 4, empleado: 'Evliyn Ebrineth Muñoz Lopez' }, // Jefe de Cumplimiento
    { extension: 111331, departamento_id: 51, agencias_id: 4, empleado: 'Catalina Molina Sanchez' },    // Cumplimiento 1
    { extension: 111332, departamento_id: 51, agencias_id: 4, empleado: 'Adonis Josue Espinoza Ramirez' }, // Cumplimiento 2
    { extension: 111333, departamento_id: 51, agencias_id: 4, empleado: 'Yesica Yohana Ordoñez Sibrian' }, // Cumplimiento 3
    { extension: 111334, departamento_id: 51, agencias_id: 4, empleado: 'Marcia Alejandra Madrid' },     // Cumplimiento 4
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

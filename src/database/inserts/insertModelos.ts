import { Connection } from 'mysql2/promise';

// Función para insertar los datos en la tabla modelo solo si no existen
export const insertModelos = async (connection: Connection) => {
  // Datos de los modelos de Dell para insertar en la tabla modelo
  const modelos = [
    { nombre: 'E2216H', marca_id: 1 },
    { nombre: 'E2016H', marca_id: 1 },
    { nombre: 'E2014H', marca_id: 1 },
    { nombre: 'E1715Sc', marca_id: 1 },
    { nombre: 'E2020H', marca_id: 1 },
    { nombre: 'E1913SF', marca_id: 1 },
    { nombre: 'E1916HF', marca_id: 1 },
    { nombre: 'E1920H', marca_id: 1 },
    { nombre: 'E170SC', marca_id: 1 },
    { nombre: 'E157FPC', marca_id: 1 },
    { nombre: 'P170ST', marca_id: 1 },
    { nombre: 'SE2417HG', marca_id: 1 },
    { nombre: 'P2422H', marca_id: 1 },
    { nombre: 'OPTIPLEX 790', marca_id: 1 },
    { nombre: 'OPTIPLEX 3010', marca_id: 1 },
    { nombre: 'OPTIPLEX 3020', marca_id: 1 },
    { nombre: 'OPTIPLEX 3040', marca_id: 1 },
    { nombre: 'OPTIPLEX 3050', marca_id: 1 },
    { nombre: 'OPTIPLEX 3060', marca_id: 1 },
    { nombre: 'OPTIPLEX 3070', marca_id: 1 },
    { nombre: 'OPTIPLEX 3080', marca_id: 1 },
    { nombre: 'OPTIPLEX 3090', marca_id: 1 },
    { nombre: 'OPTIPLEX 7010SFF NM', marca_id: 1 },
    { nombre: 'OPTIPLEX 7010', marca_id: 1 },
    { nombre: 'LATITUDE E5440', marca_id: 1 },
    { nombre: 'LATITUDE E5450', marca_id: 1 },
    { nombre: 'LATITUDE E5470', marca_id: 1 },
    { nombre: 'LATITUDE 5480', marca_id: 1 },
    { nombre: 'LATITUDE 5490', marca_id: 1 },
    { nombre: 'LATITUDE 5540', marca_id: 1 },

    { nombre: 'L395', marca_id: 3 },
    { nombre: 'L5190', marca_id: 3 },
    { nombre: 'L380', marca_id: 3 },
    { nombre: 'L3210', marca_id: 3 },
    { nombre: 'L3250', marca_id: 3 },
    { nombre: 'L3110', marca_id: 3 },
    { nombre: 'TM TERMINCA', marca_id: 3 },

    { nombre: 'LaserJet Pro P1606dn', marca_id: 2 },
    { nombre: '107W', marca_id: 2 },
    { nombre: 'P1102', marca_id: 2 },
    { nombre: 'LaserJet Pro M203dw', marca_id: 2 },

    { nombre: 'AVAYA TELEFONO', marca_id: 4 },
  { nombre: 'AVAYA 1603SW', marca_id: 4 },
  { nombre: 'AVAYA J129', marca_id: 4 },
  { nombre: 'AVAYA 9608', marca_id: 4 },

    { nombre: 'KM2810', marca_id: 6 },
    { nombre: 'KM1820', marca_id: 6 },
    { nombre: 'M3550IDN', marca_id: 6 },
    { nombre: 'M3040DN', marca_id: 6 },
    { nombre: 'M2035DN', marca_id: 6 },

    { nombre: 'PR2 PLUS', marca_id: 5 },

    { nombre: 'UPS', marca_id: 7 },
    { nombre: 'ESCANER CANON', marca_id: 7 },
    { nombre: 'LECTOCLASIFICADORA', marca_id: 7 },
    { nombre: 'LG', marca_id: 7 },
    { nombre: 'CISCO 2960', marca_id: 7 },
    { nombre: 'DATACARD', marca_id: 7 },
    { nombre: 'UPS APC', marca_id: 7 },
    { nombre: 'UPS POWAREWARE(EATON)', marca_id: 7 },
    { nombre: '3NSTAR', marca_id: 7 },
    { nombre: 'SWITCH CISCO', marca_id: 7 },
    { nombre: 'ROUTER CISCO', marca_id: 7 },
    { nombre: 'IMPRESORA TERMICA', marca_id: 7 },
    { nombre: 'ELO TOUCH', marca_id: 7 },
  ];

  // Crear una lista de los nombres de los modelos
  const nombresModelos = modelos.map(modelo => modelo.nombre);

  // Verificar cuántos de los modelos ya existen
  const checkModelosSQL = `
    SELECT COUNT(*) as count FROM modelo WHERE nombre IN (${nombresModelos.map(() => '?').join(', ')});
  `;
 
  // Ejecutar consulta para verificar los modelos existentes
  const [rows]: any = await connection.query(checkModelosSQL, nombresModelos);

  // Si no hay modelos existentes, proceder a insertarlos
  if (rows[0].count === 0) {
    const insertModelosSQL = `
      INSERT INTO modelo (nombre, marca_id) VALUES 
      ${modelos.map(() => '(?, ?)').join(', ')};
    `;

    // Extraer los valores de nombre y marca_id para la inserción
    const insertValues = modelos.flatMap(modelo => [modelo.nombre, modelo.marca_id]);

    await connection.query(insertModelosSQL, insertValues);
    console.log('Modelos insertados:', nombresModelos);
  } else {
    console.log('Algunos modelos ya existen, no se realizará la inserción.');
  }
};

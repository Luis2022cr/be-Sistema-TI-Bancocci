import { Connection } from 'mysql2/promise';

// Función para insertar los datos de la segunda imagen en la tabla agencias y sucursales
export const insertAgencias = async (connection: Connection) => {
  // Datos de la segunda imagen para insertar en la tabla agencias
  const agencias = [
    { nombre: 'Oficina Principal SRC', codigo: '101', ubicacion: 'Santa Rosa de Copán', estado_agencias_id: 1 },
    { nombre: 'Ag. Santa Teresa', codigo: '109', ubicacion: 'Santa Rosa de Copán', estado_agencias_id: 1 },
    { nombre: 'Ag. Corquín Copán', codigo: '110', ubicacion: 'Corquín', estado_agencias_id: 1 },
    { nombre: 'Ag. Terminal', codigo: '111', ubicacion: 'Santa Rosa de Copán', estado_agencias_id: 1 },
    { nombre: 'TI', codigo: '111', ubicacion: 'Santa Rosa de Copán', estado_agencias_id: 1 },
    { nombre: 'Ag. Dulce Nombre', codigo: '113', ubicacion: 'Dulce Nombre', estado_agencias_id: 1 },
    { nombre: 'Ag. Cucuyagua', codigo: '114', ubicacion: 'Cucuyagua', estado_agencias_id: 1 },
    { nombre: 'Ag. Lepaera Lempira', codigo: '121', ubicacion: 'Lepaera', estado_agencias_id: 1 },
    { nombre: 'Ag. Parque Central', codigo: '122', ubicacion: 'Santa Rosa de Copán', estado_agencias_id: 1 },
    { nombre: 'Autobanco La Terminal', codigo: '124', ubicacion: 'Santa Rosa de Copán', estado_agencias_id: 1 },
    { nombre: 'Ag. Uniplaza', codigo: '126', ubicacion: 'Santa Rosa de Copán', estado_agencias_id: 1 },
    { nombre: 'Copán Ruinas', codigo: '102', ubicacion: 'Copán Ruinas', estado_agencias_id: 1 },
    { nombre: 'Ag. Santa Rita', codigo: '112', ubicacion: 'Santa Rita de Copán', estado_agencias_id: 1 },
    { nombre: 'Ag. La Entrada Copán', codigo: '103', ubicacion: 'La Entrada', estado_agencias_id: 1 },
    { nombre: 'Ag. Florida Copán', codigo: '106', ubicacion: 'Florida', estado_agencias_id: 1 },
    { nombre: 'Ag. La Joya (Terminal)', codigo: '117', ubicacion: 'Santa Bárbara', estado_agencias_id: 1 },
    { nombre: 'Ag. Sula Santa Bárbara', codigo: '118', ubicacion: 'Santa Bárbara', estado_agencias_id: 1 },
    { nombre: 'Autobanco La Entrada', codigo: '120', ubicacion: 'La Entrada', estado_agencias_id: 1 },
    { nombre: 'Gracias Lempira', codigo: '104', ubicacion: 'Gracias', estado_agencias_id: 1 },
    { nombre: 'Ag. Centro Gracias', codigo: '130', ubicacion: 'Gracias', estado_agencias_id: 1 },
    { nombre: 'San Marcos Ocotepeque', codigo: '105', ubicacion: 'San Marcos Ocotepeque', estado_agencias_id: 1 },
    { nombre: 'Ag. Boulevard San Marcos', codigo: '132', ubicacion: 'San Marcos', estado_agencias_id: 1 },
    { nombre: 'Ag. La Labor Ocotepeque', codigo: '116', ubicacion: 'La Labor, Ocotepeque', estado_agencias_id: 1 },
    { nombre: 'La Esperanza', codigo: '301', ubicacion: 'La Esperanza', estado_agencias_id: 1 },
    { nombre: 'Ag. Marcala', codigo: '302', ubicacion: 'Marcala', estado_agencias_id: 1 },
    { nombre: 'Ag. Santiago Puringla', codigo: '303', ubicacion: 'Santiago Puringla', estado_agencias_id: 1 },
    { nombre: 'El Way', codigo: '305', ubicacion: 'La Esperanza', estado_agencias_id: 1 },
    { nombre: 'Ag. Junior', codigo: '306', ubicacion: 'La Esperanza', estado_agencias_id: 1 },
    { nombre: 'Ag. Barrio Abajo', codigo: '307', ubicacion: 'La Esperanza', estado_agencias_id: 1 },
    { nombre: 'Autobanco Barrio Abajo', codigo: '308', ubicacion: 'La Esperanza', estado_agencias_id: 1 },
    { nombre: 'Ag. San Juan', codigo: '309', ubicacion: 'San Juan, Intibucá', estado_agencias_id: 1 },
    { nombre: 'Ag. San Nicolás', codigo: '209', ubicacion: 'Santa Bárbara', estado_agencias_id: 1 },
    { nombre: 'Ag. Atima SB', codigo: '264', ubicacion: 'Santa Bárbara', estado_agencias_id: 1 },
    { nombre: 'Ag. Santa Bárbara ', codigo: '218', ubicacion: 'Santa Bárbara', estado_agencias_id: 1 },
    { nombre: 'Ag. San Luis', codigo: '208', ubicacion: 'Santa Bárbara', estado_agencias_id: 1 },
    { nombre: 'Ag. Colinas SB', codigo: '203', ubicacion: 'Santa Bárbara', estado_agencias_id: 1 },
    { nombre: 'Ag. Ocotepeque', codigo: '107', ubicacion: 'Ocotepeque', estado_agencias_id: 1 },
    { nombre: 'Ag. El Junco', codigo: '248', ubicacion: 'Ocotepeque', estado_agencias_id: 1 },
    // { nombre: 'Suc. SPS', codigo: '201', ubicacion: 'San Pedro Sula', estado_agencias_id: 1 },
    // { nombre: 'Suc. Tegucigalpa', codigo: '401', ubicacion: 'Tegucigalpa', estado_agencias_id: 1 },
    // { nombre: 'Suc. Choluteca', codigo: '501', ubicacion: 'Choluteca', estado_agencias_id: 1 },
    // { nombre: 'Suc. Siguatepeque', codigo: '601', ubicacion: 'Siguatepeque', estado_agencias_id: 1 },
    // { nombre: 'Suc. Comayagua', codigo: '701', ubicacion: 'Comayagua', estado_agencias_id: 1 },
    // { nombre: 'Suc. Juticalpa', codigo: '801', ubicacion: 'Juticalpa', estado_agencias_id: 1 },
    // { nombre: 'Suc. La Ceiba', codigo: '901', ubicacion: 'La Ceiba', estado_agencias_id: 1 },
  ];

  // Extraer todos los códigos de agencias
  const codigos = agencias.map(({ codigo }) => codigo);

  // Verificar si alguna de las agencias ya existe
  const checkAgenciaSQL = `
    SELECT COUNT(*) as count FROM agencias WHERE codigo IN (${codigos.map(() => '?').join(', ')});
  `;

  // Ejecutar la consulta de verificación
  const [checkRows]: any = await connection.query(checkAgenciaSQL, codigos);

  // Si existe al menos una agencia, cancelar la inserción
  if (checkRows[0].count > 0) {
    console.log(`Ya existe al menos una agencia con alguno de los códigos proporcionados. No se realizará la inserción.`);
    return;
  }

  // Si no existen, insertar todas las agencias
  const insertAgenciaSQL = `
    INSERT INTO agencias (nombre, codigo, ubicacion, estado_agencias_id) 
    VALUES (?, ?, ?, ?);
  `;

  try {
    for (const { nombre, codigo, ubicacion, estado_agencias_id } of agencias) {
      await connection.query(insertAgenciaSQL, [nombre, codigo, ubicacion, estado_agencias_id]);
      console.log(`Agencia insertada: ${nombre} con código ${codigo}`);
    }
  } catch (error) {
    console.error('Error al insertar las agencias:', error);
  }
};

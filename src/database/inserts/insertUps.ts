import { Connection } from 'mysql2/promise';

// Función para insertar registros de UPS solo si no existen
export const insertUpsIfNotExists = async (connection: Connection) => {
  // Datos a insertar en la tabla `ups`
  const upsData = [
    [21, 'UPS.ASM.105', 'PW 9170', 9, '2005-09-20', 0, '2009-09-19', 4, 4, 1, 2],
    [1, 'UPS1.SRC.101', 'PW 9170', 18, '2006-02-21', 0, '2010-02-20', 6, 6, 1, 2],
    [25, 'UPS.MLP.302', 'PW 9170', 9, '2007-09-21', 0, '2011-09-20', 3, 3, 1, 2],
    [37, 'UPS.AOC.107', 'PW 9170', 9, '2007-10-01', 0, '2011-09-30', 4, 3, 1, 2],
    [12, 'UPS.ACR.102', 'PW 9355', 9, '2007-10-05', 0, '2011-10-04', 3, 3, 1, 2],
    [24, 'UPS.OLE.301', 'PW 9170', 9, '2007-10-09', 0, '2011-10-08', 3, 3, 1, 2],
    [9, 'UPS.APC.122', 'PW 9170', 6, '2007-12-08', 0, '2011-12-07', 2, 2, 1, 2],
    [14, 'UPS.ALE.103', 'PW 9170', 12, '2007-12-18', 0, '2011-12-17', 4, 3, 1, 2],
    [1, 'UPS2.SRC.101', 'PW 9170', 6, '2008-05-29', 0, '2012-05-28', 2, 2, 1, 2],
    [4, 'UPS1.NOC.111', null, 9, '2009-06-01', 0, '2013-05-31', 3, null, 1, 2],
    [4, 'UPS2.NOC.111', null, 24, '2009-06-01', 0, '2013-05-31', null, null, 1, 2],
    [20, 'UPS.AGL.130', 'PW 9170', 9, '2009-12-08', 0, '2013-12-07', 3, 3, 1, 2],
    [19, 'UPS.AGL.104', 'EMERSON', 10, '2017-03-04', 8, '2021-03-04', null, null, 1, 2],
    [29, 'UPS.ABA.307', 'PW 9170', 6, '2009-12-23', 0, '2013-12-22', 2, 2, 1, 2],
    [17, 'UPS.SSB.118', 'PW 9170', 6, '2010-01-25', 0, '2014-01-24', 2, 2, 1, 2],
    [23, 'UPS.LLO.116', 'PW 9170', 6, '2011-03-07', 0, '2015-03-06', 2, 2, 1, 2],
    [16, 'UPS.SSB.117', 'PW 9170', 6, '2011-06-27', 0, '2015-06-26', 2, 2, 1, 2],
    [2, '10.1.109.224', null, 10, '2019-08-19', 5, '2023-08-18', null, null, 1, 2],
    [2, '10.1.109.225', null, 6, '2019-08-19', 5, '2023-08-18', null, null, 1, 2],
    [3, 'UPS Corquin', 'PW DX LAN', 6, '2024-07-04', 0, '2028-07-04', null, null, 1, 2]
  ];

  // Consulta para verificar si los registros ya existen por nombre
  const checkUpsSQL = `
    SELECT nombre FROM ups WHERE nombre IN (${upsData.map(() => '?').join(', ')});
  `;
  const upsNames = upsData.map(data => data[1]);

  // Ejecutar consulta para verificar registros existentes
  const [existingRows]: any = await connection.query(checkUpsSQL, upsNames);
  const existingNames = existingRows.map((row: any) => row.nombre);

  // Filtrar datos que no existen en la base de datos
  const newUpsData = upsData.filter(data => !existingNames.includes(data[1]));

  // Si hay nuevos datos, proceder a insertarlos
  if (newUpsData.length > 0) {
    const insertUpsSQL = `
      INSERT INTO ups (agencias_id, nombre, modelo, kva, fecha_instalacion, años_uso, proximo_cambio, modulos, baterias, estado_ups_id, tipo_tamano_id)
      VALUES ${newUpsData.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ')};
    `;

    // Aplanar el array de datos para pasarlo como parámetros
    const insertParams = newUpsData.flat();

    // Ejecutar la inserción
    await connection.query(insertUpsSQL, insertParams);
    console.log('Nuevos registros de UPS insertados:', newUpsData.map(data => data[1]));
  } else {
    console.log('No hay nuevos registros de UPS para insertar.');
  }
};

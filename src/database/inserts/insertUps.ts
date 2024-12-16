import { Connection } from 'mysql2/promise';

// Función para insertar registros de UPS solo si no existen
export const insertUpsIfNotExists = async (connection: Connection) => {
  // Datos a insertar en la tabla `ups`
  const upsData = [
    [21, 'UPS.ASM.105', 'PW 9170', '10.1.105.224' , 9, '2005-09-20', 4, '2009-09-19', 4, 4, 1, 2],
    [1, 'UPS1.SRC.101', 'PW 9170', '10.1.101.224', 18, '2006-02-21', 4, '2010-02-20', 6, 6, 1, 2],
    [25, 'UPS.MLP.302', 'PW 9170', '10.3.102.224', 9, '2007-09-21', 4, '2011-09-20', 3, 3, 1, 2],
    [37, 'UPS.AOC.107', 'PW 9170', '10.1.107.224', 9, '2007-10-01', 4, '2011-09-30', 4, 3, 1, 2],
    [12, 'UPS.ACR.102', 'PW 9355', '10.1.102.224', 9, '2007-10-05', 4, '2011-10-04', 3, 3, 1, 2],
    [24, 'UPS.OLE.301', 'PW 9170', '10.3.101.224', 9, '2007-10-09', 4, '2011-10-08', 3, 3, 1, 2],
    [24, 'UPS.OLE2.301', 'PW 9170', '10.3.101.225', 6, '2022-04-26', 4, '2026-04-26', 3, 3, 1, 2],
    [9, 'UPS.APC.122', 'PW 9170', '10.1.122.224', 6, '2007-12-08', 4, '2011-12-07', 2, 2, 1, 2],
    [14, 'UPS.ALE.103', 'PW 9170', '10.1.103.224', 12, '2007-12-18', 4, '2011-12-17', 4, 3, 1, 2],
    [1, 'UPS2.SRC.101', 'PW 9170', '10.1.101.225', 6, '2008-05-29', 4, '2012-05-28', 2, 2, 1, 2],
    [4, 'UPS1.NOC.111', null, '10.11.101.11', 9, '2009-06-01', 4, '2013-05-31', 3, null, 1, 2],
    [4, 'UPS2.NOC.111', null, '10.11.101.12', 24, '2009-06-01', 4, '2013-05-31', null, null, 1, 2],
    [20, 'UPS.AGL.130', 'PW 9170', '10.1.130.224', 9, '2009-12-08', 4, '2013-12-07', 3, 3, 1, 2],
    [19, 'UPS.AGL.104', 'EMERSON', '10..104.224', 10, '2017-03-04', 4, '2021-03-04', null, null, 1, 2],
    [29, 'UPS.ABA.307', 'PW 9170', '10.3.107.224', 6, '2009-12-23', 4, '2013-12-22', 2, 2, 1, 2],
    [17, 'UPS.SSB.118', 'PW 9170', '10.1.118.224', 6, '2010-01-25', 4, '2014-01-24', 2, 2, 1, 2],
    [23, 'UPS.LLO.116', 'PW 9170', '10.1.116.224', 6, '2011-03-07', 4, '2015-03-06', 2, 2, 1, 2],
    [16, 'UPS.SSB.117', 'PW 9170', '10.1.117.224', 6, '2011-06-27', 4, '2015-06-26', 2, 2, 1, 2],
    [2, 'UPS.STR.109', null, '10.1.109.224', 10, '2019-08-19', 5, '2023-08-18', null, null, 1, 2],
    [2, 'UPS.STR2.109', null, '10.1.109.225', 6, '2019-08-19', 5, '2023-08-18', null, null, 1, 2],
    [3, 'UPS Corquin', 'PW DX LAN', '', 6, '2024-07-04', 0, '2028-07-04', null, null, 1, 2],
    [15, 'UPS Florida Copan', 'DX-LAN', '10.1.106.224', 3, '2020-09-09', 4, '2024-09-08', null, null, 1, 1],
    [13, 'UPS Santa Rita', 'DX-LAN', '', 3, '2013-03-03', 4, '2017-03-02', null, null, 1, 1],
    [13, 'UPS Dulce Nombre', 'DX-LAN', '', 3, '2015-06-02', 4, '2019-06-01', null, null, 1, 1],
    [7, 'UPS Cucuyagua', 'DX-LAN', '10.1.114.224', 3, '2015-06-02', 4, '2019-06-01', null, null, 1, 1],
    [8, 'UPS Lepaera', 'PW-9PX', '10.1.121.224', 3, '2013-06-24', 4, '2017-06-23', null, null, 1, 1],
    [11, 'UPS.Uniplaza.126', 'PW-9PX', '10.1.126.224', 3, '2022-04-27', 4, '2026-04-27', null, null, 1, 1],
    [27, 'UPS.Way.126', 'PW-9130', '10.3.105.224', 3, '2024-07-01', 4, '2028-07-01', null, null, 1, 1],
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
      INSERT INTO ups (agencias_id, nombre, modelo, direccion_ip, kva, fecha_instalacion, años_uso, proximo_cambio, modulos, baterias, estado_ups_id, tipo_tamano_id)
      VALUES ${newUpsData.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ')};
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

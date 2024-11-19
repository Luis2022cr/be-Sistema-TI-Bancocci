import { Connection } from 'mysql2/promise';

// Función para insertar datos en la tabla ups_mapa
export const insertUpsMapa = async (connection: Connection) => {
  // Datos de ejemplo para insertar en la tabla ups_mapa
  const upsMapaDatos = [
    { ups_id: 2, lat: 14.766983223754325, lon: -88.77794996241153, estado: 'offline' },
    { ups_id: 15, lat: 15.248344752380296, lon: -88.5566675239036, estado: 'offline' },
    { ups_id: 5, lat: 14.83925113581832, lon: -89.15503966025076, estado: 'offline' },
    { ups_id: 8, lat: 15.05949718305246, lon: -88.75281233119536, estado: 'offline' },
    { ups_id: 4, lat: 14.43592445549386, lon: -89.18271703209751, estado: 'offline' },
    { ups_id: 13, lat: 14.584752207346778, lon: -88.58646569972653, estado: 'offline' },
  ];
  // Extraer todos los ups_id de los datos para verificar duplicados
  const upsIds = upsMapaDatos.map(({ ups_id }) => ups_id);

  // Consulta SQL para verificar si alguna entrada ya existe en la tabla ups_mapa
  const checkUpsMapaSQL = `
    SELECT COUNT(*) as count 
    FROM ups_mapa 
    WHERE ups_id IN (${upsIds.map(() => '?').join(', ')});
  `;

  // Ejecutar la consulta de verificación
  const [checkRows]: any = await connection.query(checkUpsMapaSQL, upsIds);

  // Si existe al menos una entrada, cancelar la inserción
  if (checkRows[0].count > 0) {
    console.log("Ya existe al menos un registro con alguno de los ups_id proporcionados. No se realizará la inserción.");
    return;
  }

  // Consulta SQL para insertar datos en la tabla ups_mapa
  const insertUpsMapaSQL = `
    INSERT INTO ups_mapa (ups_id, lat, lon, estado) 
    VALUES (?, ?, ?, ?);
  `;

  try {
    // Insertar los datos en la tabla ups_mapa
    for (const { ups_id, lat, lon, estado } of upsMapaDatos) {
      await connection.query(insertUpsMapaSQL, [ups_id, lat, lon, estado]);
      console.log(`Registro insertado: UPS ID ${ups_id}, Estado ${estado}`);
    }
  } catch (error) {
    console.error('Error al insertar los datos en ups_mapa:', error);
  }
};

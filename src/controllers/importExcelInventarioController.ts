import { Request, Response } from 'express';
import pool from '../database/mysql';
import xlsx from 'xlsx';
import { OkPacket, RowDataPacket } from 'mysql2';

interface InventarioRow {
  inventario?: string;
  serie?: string;
  tipo_inventario?: string;
  marca?: string;
  modelo?: string;
  agencia_origen?: string;
  agencia_actual?: string;
  estado?: string;
  comentarios?: string;
}

const obtenerOcrear = async (
  table: string,
  column: string,
  value: string | number,
  additionalData: object = {}
): Promise<number> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT id FROM ${table} WHERE ${column} = ? LIMIT 1`,
      [value]
    );

    if (rows.length > 0) {
      return rows[0].id; // Si ya existe, retorna el ID
    }

    // Si no existe, inserta el nuevo valor
    const columns = [column, ...Object.keys(additionalData)];
    const values = [value, ...Object.values(additionalData)];

    const [result] = await pool.query<OkPacket>(
      `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
      values
    );

    return result.insertId; // Retorna el ID insertado
  } catch (error) {
    console.error('Error en obtenerOcrear:', error);
    throw error; // Si ocurre un error, lo lanzamos para que se maneje arriba
  }
};

export const importarInventario = async (req: Request, res: Response) => {
  try {
    const filePath = req.file?.path;

    if (!filePath) {
      return res.status(400).json({ error: 'No se subió ningún archivo.' });
    }

    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Usuario no autenticado.' });
    }

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data: InventarioRow[] = xlsx.utils.sheet_to_json<InventarioRow>(workbook.Sheets[sheetName]);

    // Mapeo de estados del Excel a la base de datos
    const estadoMap: { [key: string]: number } = {
      'En Agencia': 1,
      'Trasladado': 5,
      'Retirado Obsoleto': 4,
      'Retirada por Daño': 3,
    };

    for (const row of data) {
      const processedInventario = row.inventario
      ? String(row.inventario).split('.')[0] 
      : ''; 


      // Comprobación de tipo de inventario y marca, considerando mayúsculas/minúsculas
      let tipoInventarioId = 9;
      if (row.tipo_inventario) {
        if (row.tipo_inventario.toLowerCase() === 'impresora' && row.marca?.toLowerCase() === 'olivetti') {
          tipoInventarioId = 4;
        } else {
          tipoInventarioId = await obtenerOcrear('tipo_inventario', 'nombre', row.tipo_inventario).catch(() => 9);
        }
      }

      const marcaId = row.marca
        ? await obtenerOcrear('marca', 'nombre', row.marca).catch(() => null)
        : null;

      const modeloId = row.modelo
        ? await obtenerOcrear('modelo', 'nombre', row.modelo, { marca_id: marcaId }).catch(() => null)
        : null;

      const isNumeric = (value: any): boolean => {
        return !isNaN(value) && !isNaN(parseFloat(value));
      };

      const agenciaOrigenId = row.agencia_origen && typeof row.agencia_origen === 'string'
        ? await obtenerOcrear(
            'agencias',
            'codigo',
            isNumeric(row.agencia_origen.split(' ')[0])
              ? row.agencia_origen.split(' ')[0]
              : '5',
            { nombre: row.agencia_origen.split(' ').slice(1).join(' ') }
          )
        : 5;

      const agenciaActualId = row.agencia_actual && typeof row.agencia_actual === 'string'
        ? row.agencia_actual.toLowerCase() === 'ti' || row.agencia_actual.toLowerCase() === 't.i'
          ? 5
          : await obtenerOcrear(
              'agencias',
              'codigo',
              isNumeric(row.agencia_actual.split(' ')[0])
                ? row.agencia_actual.split(' ')[0]
                : '5'
            )
        : 5;

      const estadoId = row.estado && estadoMap[row.estado] ? estadoMap[row.estado] : 1;

      // Verificar si ya existe un registro con el mismo código o serie
      const [existingRecord] = await pool.query<RowDataPacket[]>(
        `SELECT 1 
          FROM inventario 
          WHERE codigo = ? OR serie = ? 
          LIMIT 1`,
        [processedInventario, row.serie]
      );

      if (existingRecord.length > 0) {
        continue;
      }

      // Insertar el inventario con el código procesado
      await pool.query(
        `INSERT INTO inventario 
          (codigo, serie, tipo_inventario_id, marca_id, modelo_id, agencias_id_origen, agencias_id_actual, estado_id, usuario_id, comentarios)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          processedInventario || '',
          row.serie || '',
          tipoInventarioId,
          marcaId,
          modeloId,
          agenciaOrigenId,
          agenciaActualId,
          estadoId,
          userId,
          row.comentarios || null,
        ]
      );
    }

    res.status(200).json({ message: 'Datos importados exitosamente.' });
  } catch (error) {
    console.error('Error al importar los datos:', error);
    res.status(500).json({ error: 'Error al importar los datos.' });
  }
};

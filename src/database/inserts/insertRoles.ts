import { Connection } from 'mysql2/promise';

// Función para insertar los roles
export const insertRolesIfNotExists = async (connection: Connection) => {
  // Verificar qué roles existen
  const checkRolesSQL = `
    SELECT descripcion FROM rol WHERE descripcion IN ('admin', 'empleado', 'inactivo');
  `;

  // Ejecutar consulta para verificar roles existentes
  const [existingRoles]: any = await connection.query(checkRolesSQL);

  // Crear una lista de los roles que faltan
  const existingRolesList = existingRoles.map((role: any) => role.descripcion);

  const rolesToInsert = [];

  if (!existingRolesList.includes('admin')) {
    rolesToInsert.push('admin');
  }

  if (!existingRolesList.includes('empleado')) {
    rolesToInsert.push('empleado');
  }

  if (!existingRolesList.includes('inactivo')) {
    rolesToInsert.push('inactivo');
  }

  // Insertar solo los roles faltantes
  if (rolesToInsert.length > 0) {
    const insertRolesSQL = `
      INSERT INTO rol (descripcion) VALUES ${rolesToInsert.map(() => '(?)').join(', ')};
    `;
    await connection.query(insertRolesSQL, rolesToInsert);
    console.log('Roles insertados:', rolesToInsert);
  } else {
    console.log('Todos los roles existen.');
  }
};

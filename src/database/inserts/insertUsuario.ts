import { Connection } from 'mysql2/promise';

// Función para insertar un usuario admin si no existe
export const insertAdminIfNotExists = async (connection: Connection) => {
  // Datos del usuario admin que queremos insertar
  const adminData = {
    nombre: 'Admin 01',
    correo: 'admin@admin.com',
    usuario: 'admin01',
    contraseña: '$2a$12$jc4BopE6GnHmBm1ToEHhgOXpJWBr/gSM27WrLtoBKhaeGubeWog32', // 'Admin@2024Banccoci'
    rol_id: 1
  };

  // Verificar si el usuario admin ya existe en la tabla usuario
  const checkUserSQL = `
    SELECT * FROM usuario WHERE correo = ? OR usuario = ?;
  `;

  const [existingUser]: any = await connection.query(checkUserSQL, [adminData.correo, adminData.usuario]);

  // Si no existe el usuario, proceder con la inserción
  if (existingUser.length === 0) {
    const insertUserSQL = `
      INSERT INTO usuario (nombre, correo, usuario, contraseña, rol_id) 
      VALUES (?, ?, ?, ?, ?);
    `;

    await connection.query(insertUserSQL, [
      adminData.nombre,
      adminData.correo,
      adminData.usuario,
      adminData.contraseña,
      adminData.rol_id
    ]);

    console.log('Usuario admin insertado correctamente.');
  } else {
    console.log('El usuario admin ya existe en la base de datos.');
  }
};

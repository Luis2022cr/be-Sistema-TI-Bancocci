import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configura la conexión a tu base de datos
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,  
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0
});

// Función para verificar la conexión
const checkConnection = async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Conexión exitosa a la base de datos');
      connection.release();
    } catch (error) {
      console.error('Error al conectarse a la base de datos:', error);
    }
  };
  
  checkConnection();

// Exporta la conexión para que pueda ser utilizada en otras partes de la aplicación
export default pool;

import express, { Application, Request, Response, NextFunction } from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import crearTablasEnLaBaseDeDatos from './database/dbSetup';
import compression from 'compression';

dotenv.config(); 

const app: Application = express();
const port = process.env.PORT || 3000; 
 
// Crear base de datos y tablas al iniciar la aplicación
crearTablasEnLaBaseDeDatos();

// Configuración de seguridad con Helmet
app.use(helmet()); 

// Compresión de respuestas HTTP
app.use(compression()); 

// Configuración de CORS
const allowedOrigins = [process.env.URL_LOCAL]; 
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error('No permitido por CORS')); 
    }
  },
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para procesar datos en formato JSON
app.use(express.json());

// Rutas para la API
app.use('/api/v1', routes);

// Configuración del motor de plantillas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Ruta para la página principal
app.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Página Principal', message: 'Bienvenido a la Página Principal' });
});

// Middleware global para manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
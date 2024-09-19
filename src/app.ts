import express, { Application, Request, Response } from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';

dotenv.config(); 

const app: Application = express();
const port = process.env.PORT || 3000; 

// Configuración de seguridad con Helmet
app.use(helmet()); 

// Configuración de CORS
const allowedOrigins = [process.env.URL_FRONTEND, process.env.URL_LOCAL]; 
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

app.use(express.json());

app.use('/api/v1', routes);

// Configuración del motor de plantillas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Ruta para la página principal
app.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Página Principal', message: 'Bienvenido a la Página Principal' });
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
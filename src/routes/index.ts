// index.ts
import { Router } from 'express';
import { getEjemplo } from '../controllers/ejemploController';
// Seguridad: Solo las personas autenticada pueden usar ese recurso:
import { authenticateJWT } from '../middlewares/authMiddleware'; //ejemplo de uso= router.get('/ejemplo', authenticateJWT, getEjemplo);
import { registro, login, cambiarContraseña } from '../controllers/authController';
import { actualizaRol, crearRol, getRoles } from '../controllers/rolController';

const router: Router = Router();

// Rutas de autenticación
router.post('/auth/registro', registro);
router.post('/auth/login', login);
router.put('/auth/cambio-contrasena',authenticateJWT, cambiarContraseña);

// Rutas de Roles
router.get('/roles', getRoles);
router.post('/roles', crearRol);
router.put('/roles/:id', actualizaRol);

//Endponit de Ejemplo
router.get('/ejemplo', getEjemplo);

export default router;

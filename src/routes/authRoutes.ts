// authRoutes.ts
import { Router } from 'express';
import { registro, login, cambiarContraseña } from '../controllers/authController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const authRouter: Router = Router();

authRouter.post('/registro', registro);
authRouter.post('/login', login);
authRouter.put('/cambio-contrasena',authenticateJWT, cambiarContraseña);

export default authRouter;

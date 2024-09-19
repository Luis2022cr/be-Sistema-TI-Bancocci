// index.ts
import { Router } from 'express';
import { getEjemplo } from '../controllers/ejemploController';

const router: Router = Router();

//Endponit de Actividades
router.get('/ejemplo', getEjemplo);

export default router;

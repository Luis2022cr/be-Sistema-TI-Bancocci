// index.ts
import { Router } from 'express';
import { getEjemplo } from '../controllers/ejemploController';
// Seguridad: Solo las personas autenticada pueden usar ese recurso:
import { authenticateJWT } from '../middlewares/authMiddleware'; //ejemplo de uso= router.get('/ejemplo', authenticateJWT, getEjemplo);
import { registro, login, cambiarContraseña } from '../controllers/authController';
import { actualizaRol, crearRol, getRoles } from '../controllers/rolController';
import { actualizarDepartamento, crearDepartamentos, getDepto } from '../controllers/departamentoController';
import { actualizarTipoTamano, crearTipoTamano, getTipoTamano } from '../controllers/tipoTamanoController';
import { actualizarMarca, crearMarca, getMarca } from '../controllers/marcaController';
import { actualizarEstado, crearEstado, getEstado } from '../controllers/estadoController';
import { actualizarEstadoTecnico, crearEstadoTecnico, getEstadoTecnico } from '../controllers/estadoTecnicoController';
import { actualizarEstadoUps, crearEstadoUps, getEstadoUps } from '../controllers/estadoUpsController';
import { actualizarTipoInventario, crearTipoInventario, getTipoInventario } from '../controllers/tipoInventarioController';
import { actualizarEmpleado, crearEmpleado, eliminarEmpleado, getEmpleados } from '../controllers/empleadosController';
import { actualizarTecnico, crearTecnico, eliminarTecnico, getTecnicoPorId, getTecnicos } from '../controllers/TecnicoController';
import { actualizarDetalleSolicitud, crearDetalleSolicitud, getDetallesSolicitud } from '../controllers/detalleSolicitudController';
import { actualizarHistorialCambioUPS, crearHistorialCambioUPS, obtenerHistorialCambioUPS } from '../controllers/historialCambioUpsController';
import { actualizarDetalleEquipo, crearDetalleEquipo, obtenerDetalleEquipo } from '../controllers/detalleEquipoController';
import { actualizarControlEquipo, crearControlEquipo, obtenerControlEquipo } from '../controllers/controlEquipoController';

const router: Router = Router();

// Rutas de autenticación
router.post('/auth/registro', registro);
router.post('/auth/login', login);
router.put('/auth/cambio-contrasena',authenticateJWT, cambiarContraseña);

// Rutas de Roles
router.get('/roles', getRoles);
router.post('/roles', crearRol);
router.put('/roles/:id', actualizaRol);

// Rutas de Departamentos
router.get('/departamentos', getDepto);
router.post('/departamentos', crearDepartamentos);
router.put('/departamentos/:id', actualizarDepartamento);

// Rutas de Tipo Tamaño
router.get('/tipo_tamanos', getTipoTamano);
router.post('/tipo_tamanos', crearTipoTamano);
router.put('/tipo_tamanos/:id', actualizarTipoTamano);

// Rutas de Marca
router.get('/marcas', getMarca);
router.post('/marcas', crearMarca);
router.put('/marcas/:id', actualizarMarca);

// Rutas de Estado
router.get('/estados', getEstado);
router.post('/estados', crearEstado);
router.put('/estados/:id', actualizarEstado);

// Rutas de Estado Tecnico
router.get('/estado_tecnicos', getEstadoTecnico);
router.post('/estado_tecnicos', crearEstadoTecnico);
router.put('/estado_tecnicos/:id', actualizarEstadoTecnico);

// Rutas de Estado UPS
router.get('/estado_ups', getEstadoUps);
router.post('/estado_ups', crearEstadoUps);
router.put('/estado_ups/:id', actualizarEstadoUps);

// Rutas de Tipo Inventario
router.get('/tipo_inventarios', getTipoInventario);
router.post('/tipo_inventarios', crearTipoInventario);
router.put('/tipo_inventarios/:id', actualizarTipoInventario);

// Rutas de Estado UPS
router.get('/empleados', getEmpleados);
router.post('/empleados', crearEmpleado);
router.put('/empleados/:id', actualizarEmpleado);
router.delete('/empleados/:id', eliminarEmpleado);

// Rutas de Estado UPS
router.get('/tecnicos', getTecnicos);
router.get('/tecnicos/:id', getTecnicoPorId);
router.post('/tecnicos', crearTecnico);
router.put('/tecnicos/:id', actualizarTecnico);
router.delete('/tecnicos/:id', eliminarTecnico);

// Rutas de detalle solicitud
router.get('/detalle-solicitud', getDetallesSolicitud);
router.post('/detalle-solicitud', crearDetalleSolicitud);
router.put('/detalle-solicitud/:id', actualizarDetalleSolicitud);

// Rutas para historial_cambio_ups
router.get('/historial_cambio_ups', obtenerHistorialCambioUPS);  
router.post('/historial_cambio_ups', crearHistorialCambioUPS);    
router.put('/historial_cambio_ups/:id', actualizarHistorialCambioUPS); 

// Rutas para detalle_equipo
router.get('/detalle_equipo', obtenerDetalleEquipo);  
router.post('/detalle_equipo', crearDetalleEquipo);   
router.put('/detalle_equipo/:id', actualizarDetalleEquipo); 

// Rutas para control_equipo
router.get('/control_equipo', obtenerControlEquipo);  
router.post('/control_equipo', crearControlEquipo);   
router.put('/control_equipo/:id', actualizarControlEquipo); 


//Endponit de Ejemplo
router.get('/ejemplo', getEjemplo);

export default router;

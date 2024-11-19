// index.ts
import { Router } from 'express';
// Seguridad: Solo las personas autenticada pueden usar ese recurso:
import { authenticateJWT } from '../middlewares/authMiddleware'; //ejemplo de uso= router.get('/ejemplo', authenticateJWT, getEjemplo);
import { registro, login, cambiarContraseña, cambiarContraseñaPorAdmin } from '../controllers/authController';
import { actualizaRol, crearRol, getRoles } from '../controllers/rolController';
import { actualizarDepartamento, crearDepartamentos, getDepto, getDeptoPorId } from '../controllers/departamentoController';
import { actualizarTipoTamano, crearTipoTamano, getTipoTamano } from '../controllers/tipoTamanoController';
import { actualizarMarca, crearMarca, getMarca, getMarcaById } from '../controllers/marcaController';
import { actualizarEstado, crearEstado, getEstado, getLog } from '../controllers/estadoController';
import { actualizarEstadoUps, crearEstadoUps, getEstadoUps } from '../controllers/estadoUpsController';
import { actualizarTipoInventario, crearTipoInventario, getTipoInventario } from '../controllers/tipoInventarioController';
import { actualizarHistorialCambioUPS, crearHistorialCambioUPS, obtenerHistorialCambioUPS } from '../controllers/historialCambioUpsController';
import { getPerfilUsuario, actualizarPerfilUsuario, getUsuarios, actualizarDatosUsuario, getUsuariosById } from '../controllers/usuarioController';
import { actualizarEstadoAgencias, crearEstadoAgencias, getEstadoAgencias } from '../controllers/estadoAgenciasController';
import { actualizarAgencias, actualizarEstadoAgencia, crearAgencias, getAgencias, getAgenciasById } from '../controllers/agenciasController';
import { actualizarDirectorio, crearDirectorio, eliminarDirectorio, getDirectorios, getDirectoriosById } from '../controllers/directorioController';

import { getUps, crearUps, actualizarUps, eliminarUps, getUpsPorIdConHistorial, getUpsSelect, getcalendarUPS, getUpsById } from '../controllers/upsController';
import { getInventarios, getInventarioPorId, crearInventario, actualizarInventario, eliminarInventario, getInventarioPorIdConHistorial, getInventariosPorTipoConHistorial } from '../controllers/inventariosController';

import { actualizarModelo, crearModelo, getModelo, getModeloById } from '../controllers/modeloController';
import { getUpsMapa, createUpsMapa, deleteUpsMapa } from '../controllers/mapaController';
import { actualizarHistorialCambioInventario, crearHistorialCambioInventario, obtenerHistorialCambioInventario } from '../controllers/historialCambioInventarioController';
import { checkNotificacionesUps, getNotificacionesUps } from '../controllers/notificacionesController';



const router: Router = Router();

// Rutas de autenticación
router.post('/auth/registro',authenticateJWT, registro);
router.post('/auth/login', login);
router.put('/auth/cambio-contrasena',authenticateJWT, cambiarContraseña);
router.put('/auth/cambio-contrasena-admin/:id', cambiarContraseñaPorAdmin);

// rutas para Usuarios
router.get('/perfil/usuario',authenticateJWT, getPerfilUsuario);
router.put('/perfil/usuario',authenticateJWT, actualizarPerfilUsuario);
router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuariosById);
router.put('/usuarios/:id', actualizarDatosUsuario);

// Rutas de Roles
router.get('/roles', getRoles);
router.post('/roles', crearRol);
router.put('/roles/:id', actualizaRol);

// Rutas de Tipo Inventario
router.get('/tipo_inventarios', getTipoInventario);
router.post('/tipo_inventarios', crearTipoInventario);
router.put('/tipo_inventarios/:id', actualizarTipoInventario);

// Rutas de Departamentos
router.get('/departamentos', getDepto);
router.get('/departamento/:id', getDeptoPorId);
router.post('/crear_departamentos', crearDepartamentos);
router.put('/actualizar-departamento/:id', actualizarDepartamento);

// Rutas de Tipo Tamaño
router.get('/tipo_tamanos', getTipoTamano);
router.post('/tipo_tamanos', crearTipoTamano);
router.put('/tipo_tamanos/:id', actualizarTipoTamano);

// Rutas de Marca
router.get('/marcas', getMarca);
router.get('/marca/:id', getMarcaById);
router.post('/crear_marcas', crearMarca);
router.put('/actualizar-marca/:id', actualizarMarca);

// Rutas de Marca
router.get('/modelos', getModelo);
router.get('/modelo/:id', getModeloById);
router.post('/crear_modelos', crearModelo);
router.put('/actualizar-modelo/:id', actualizarModelo);

// Rutas de Estado
router.get('/estados_inventarios', getEstado);
router.post('/estados_inventarios', crearEstado);
router.put('/estados_inventarios/:id', actualizarEstado);

// Rutas de Estado UPS
router.get('/estado_ups', getEstadoUps);
router.post('/estado_ups', crearEstadoUps);
router.put('/estado_ups/:id', actualizarEstadoUps);

// Rutas de Estado Agencias
router.get('/estado_agencias', getEstadoAgencias);
router.post('/estado_agencias', crearEstadoAgencias);
router.put('/estado_agencias/:id', actualizarEstadoAgencias);

// Rutas para historial_cambio_ups
router.get('/historial_cambio_ups',authenticateJWT, obtenerHistorialCambioUPS);  
router.post('/historial_cambio_ups',authenticateJWT, crearHistorialCambioUPS);    
router.put('/historial_cambio_ups/:id',authenticateJWT, actualizarHistorialCambioUPS); 

// Rutas de Estado Agencias
router.get('/agencias', getAgencias);
router.get('/agencia/:id', getAgenciasById);
router.post('/crear_agencias',authenticateJWT, crearAgencias);
router.put('/actualizar-agencia/:id',authenticateJWT, actualizarAgencias);
router.patch('/agencias/:id/estado',authenticateJWT, actualizarEstadoAgencia);


// Rutas de Estado directorios
router.get('/directorios',authenticateJWT, getDirectorios);
router.get('/directorios/:id',authenticateJWT, getDirectoriosById);
router.post('/directorios',authenticateJWT, crearDirectorio);
router.put('/directorios/:id',authenticateJWT, actualizarDirectorio);
router.delete('/directorios/:id',authenticateJWT, eliminarDirectorio);

// Rutas de UPS
router.get('/ups', getUps);
router.get('/ups/:id', getUpsById); 
router.get('/ups-select', getUpsSelect);
router.get('/ups/:id/historial', getUpsPorIdConHistorial); 
router.post('/ups', authenticateJWT, crearUps);
router.put('/ups/:id',authenticateJWT, actualizarUps);
router.patch('/ups/:id/estado',authenticateJWT, eliminarUps);

//ruta para calendario
router.get('/calendario/ups', getcalendarUPS);

//LOGS
router.get('/logs', getLog);

// Rutas para el CRUD de UPS Mapa
router.get('/ups-mapa',authenticateJWT, getUpsMapa);
router.post('/ups-mapa',authenticateJWT, createUpsMapa);
router.delete('/ups-mapa/:id',authenticateJWT, deleteUpsMapa);

// Rutas de Inventarios
router.get('/inventarios', getInventarios);
router.get('/inventarios/:id', getInventarioPorId);
router.get('/inventario/:id', getInventarioPorIdConHistorial); 
router.post('/inventarios',authenticateJWT, crearInventario);
router.put('/inventarios/:id',authenticateJWT, actualizarInventario);
router.patch('/inventarios/:id/estado', eliminarInventario);
router.get('/inventarios/:tipo_inventario_id/historial', getInventariosPorTipoConHistorial);

// Rutas para historial_cambio_inventario
router.get('/historial_inventario', obtenerHistorialCambioInventario);  
router.post('/historial_inventario', authenticateJWT, crearHistorialCambioInventario);    
router.put('/historial_inventario/:id',authenticateJWT, actualizarHistorialCambioInventario); 

// Ruta para obtener las notificaciones
router.get('/notificaciones', getNotificacionesUps);  
router.get('/notificaciones/check', checkNotificacionesUps);  

export default router;

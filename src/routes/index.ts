// index.ts
import { Router } from 'express';
// Seguridad: Solo las personas autenticada pueden usar ese recurso:
import { authenticateJWT } from '../middlewares/authMiddleware'; //ejemplo de uso= router.get('/ejemplo', authenticateJWT, getEjemplo);
import { registro, login, cambiarContraseña, cambiarContraseñaPorAdmin } from '../controllers/authController';
import { actualizaRol, crearRol, getRoles } from '../controllers/rolController';
import { actualizarDepartamento, crearDepartamentos, getDepto } from '../controllers/departamentoController';
import { actualizarTipoTamano, crearTipoTamano, getTipoTamano } from '../controllers/tipoTamanoController';
import { actualizarMarca, crearMarca, getMarca } from '../controllers/marcaController';
import { actualizarEstado, crearEstado, getEstado } from '../controllers/estadoController';
import { actualizarEstadoTecnico, crearEstadoTecnico, getEstadoTecnico } from '../controllers/estadoTecnicoController';
import { actualizarEstadoUps, crearEstadoUps, getEstadoUps } from '../controllers/estadoUpsController';
import { actualizarTipoInventario, crearTipoInventario, getTipoInventario } from '../controllers/tipoInventarioController';
import { actualizarTecnico, crearTecnico, eliminarTecnico, getTecnicoPorId, getTecnicos } from '../controllers/TecnicoController';
import { actualizarDetalleSolicitud, crearDetalleSolicitud, getDetallesSolicitud } from '../controllers/detalleSolicitudController';
import { actualizarHistorialCambioUPS, crearHistorialCambioUPS, obtenerHistorialCambioUPS } from '../controllers/historialCambioUpsController';
import {  crearControlEquipo, getControlEquiposConDetalles, getControlEquiposConDetallesID } from '../controllers/controlEquipoController';
import { getPerfilUsuario, actualizarPerfilUsuario, getUsuarios, actualizarDatosUsuario, getUsuariosById } from '../controllers/usuarioController';
import { actualizarEstadoAgencias, crearEstadoAgencias, getEstadoAgencias } from '../controllers/estadoAgenciasController';
import { actualizarAgencias, actualizarEstadoAgencia, crearAgencias, getAgencias } from '../controllers/agenciasController';
import { actualizarDirectorio, crearDirectorio, eliminarDirectorio, getDirectorios, getDirectoriosById } from '../controllers/directorioController';
import { getUps, crearUps, actualizarUps, eliminarUps, getUpsPorIdConHistorial, getUpsSelect, getcalendarUPS } from '../controllers/upsController';
import { getInventarios, getInventarioPorId, crearInventario, actualizarInventario, eliminarInventario, getInventarioPorIdConHistorial } from '../controllers/inventariosController';
import { actualizarModelo, crearModelo, getModelo } from '../controllers/modeloController';
import { getUpsMapa, createUpsMapa, deleteUpsMapa } from '../controllers/mapaController';
import { actualizarHistorialCambioInventario, crearHistorialCambioInventario, obtenerHistorialCambioInventario } from '../controllers/historialCambioInventarioController';
import { checkNotificacionesUps, getNotificacionesUps } from '../controllers/notificacionesController';



const router: Router = Router();

// Rutas de autenticación
router.post('/auth/registro', registro);
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

// Rutas de detalle solicitud
router.get('/detalle-solicitud', getDetallesSolicitud);
router.post('/detalle-solicitud', crearDetalleSolicitud);
router.put('/detalle-solicitud/:id', actualizarDetalleSolicitud);

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

// Rutas de Marca
router.get('/modelos', getModelo);
router.post('/modelos', crearModelo);
router.put('/modelos/:id', actualizarModelo);

// Rutas de Estado
router.get('/estados_inventarios', getEstado);
router.post('/estados_inventarios', crearEstado);
router.put('/estados_inventarios/:id', actualizarEstado);

// Rutas de Estado Tecnico
router.get('/estado_tecnicos', getEstadoTecnico);
router.post('/estado_tecnicos', crearEstadoTecnico);
router.put('/estado_tecnicos/:id', actualizarEstadoTecnico);

// Rutas de Estado UPS
router.get('/estado_ups', getEstadoUps);
router.post('/estado_ups', crearEstadoUps);
router.put('/estado_ups/:id', actualizarEstadoUps);

// Rutas de Estado Agencias
router.get('/estado_agencias', getEstadoAgencias);
router.post('/estado_agencias', crearEstadoAgencias);
router.put('/estado_agencias/:id', actualizarEstadoAgencias);

// Rutas de Tecnico
router.get('/tecnicos', getTecnicos);
router.get('/tecnicos/:id', getTecnicoPorId);
router.post('/tecnicos', crearTecnico);
router.put('/tecnicos/:id', actualizarTecnico);
router.patch('/tecnicos/:id/estado', eliminarTecnico);


// Rutas para historial_cambio_ups
router.get('/historial_cambio_ups', obtenerHistorialCambioUPS);  
router.post('/historial_cambio_ups', crearHistorialCambioUPS);    
router.put('/historial_cambio_ups/:id', actualizarHistorialCambioUPS); 

// Rutas de Estado Agencias
router.get('/agencias', getAgencias);
router.post('/agencias', crearAgencias);
router.put('/agencias/:id', actualizarAgencias);
router.patch('/agencias/:id/estado', actualizarEstadoAgencia);


// Rutas para control_equipo
router.get('/control_equipo', getControlEquiposConDetalles);  
router.get('/control_equipo/:id', getControlEquiposConDetallesID);  
router.post('/control_equipo',authenticateJWT, crearControlEquipo);   

// Rutas de Estado directorios
router.get('/directorios', getDirectorios);
router.get('/directorios/:id', getDirectoriosById);
router.post('/directorios', crearDirectorio);
router.put('/directorios/:id', actualizarDirectorio);
router.delete('/directorios/:id', eliminarDirectorio);

// Rutas de UPS
router.get('/ups', getUps);
router.get('/ups-select', getUpsSelect);
router.get('/ups/:id', getUpsPorIdConHistorial); 
router.post('/ups', crearUps);
router.put('/ups/:id', actualizarUps);
router.patch('/ups/:id/estado', eliminarUps);

//ruta para calendario
router.get('/calendario/ups', getcalendarUPS);

// Rutas para el CRUD de UPS Mapa
router.get('/ups-mapa', getUpsMapa);
router.post('/ups-mapa', createUpsMapa);
router.delete('/ups-mapa/:id', deleteUpsMapa);

// Rutas de Inventarios
router.get('/inventarios', getInventarios);
router.get('/inventarios/:id', getInventarioPorId);
router.get('/inventario/:id', getInventarioPorIdConHistorial); 
router.post('/inventarios',authenticateJWT, crearInventario);
router.put('/inventarios/:id',authenticateJWT, actualizarInventario);
router.patch('/inventarios/:id/estado', eliminarInventario);

// Rutas para historial_cambio_inventario
router.get('/historial_inventario', obtenerHistorialCambioInventario);  
router.post('/historial_inventario', authenticateJWT, crearHistorialCambioInventario);    
router.put('/historial_inventario/:id', actualizarHistorialCambioInventario); 

// Ruta para obtener las notificaciones
router.get('/notificaciones', getNotificacionesUps);  
router.get('/notificaciones/check', checkNotificacionesUps);  

export default router;

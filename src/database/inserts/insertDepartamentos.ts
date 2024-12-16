import { Connection } from 'mysql2/promise';

// Función para insertar los departamentos si no existen
export const insertDepartamentos = async (connection: Connection) => {
  // Nombres de los departamentos
  const departamentos = [
    'Gerente Regional TI - Zona Occidente',
    'Administracion de Telefonia',
    'Jefe Soporte Tecnico',
    'Soporte Tecnico',
    'Jefe de Taller',
    'Taller',
    'Usuario Expertos',
    'Sala de Reuniones TI',
    'Sala de Capacitaciones',
    'NOC',
    'Cafeteria TI',
    'Recepcion Telefonica',
    'Gegrente Regional',
    'Presidente Banco',
    'Secretaria Presidencia',
    'Secretaria Gerencia',
    'Gerente de Caja',
    'Asistente Gerente de Caja',
    'Supervisor de Caja',
    'Boveda de Caja',
    'Deposito a Domicilio',
    'Jefe Atencion al Cliente',
    'Atencion al Cliente',
    'Jefe Oficial de Credito',
    'Oficial de Credito',
    'Secretaria Oficiales de Credito',
    'Jefe de Analisis de  Creditos',
    'Analisis de Credito',
    'Jefe de Internacional',
    'Internacional',
    'Contador General',
    'Contabilidad',
    'Jefe de Prestamos',
    'Auxiliar de Prestamos',
    'Jefe de Tarjetas Visa',
    'Gestores de Tarjetas Visa',
    'Jefe de Fideicomisos',
    'Fideicomisos',
    'Jefe Regional de Recuperaciones',
    'Asistente Recuperaciones',
    'Recuperaciones',
    'Recuperaciones Call Center',
    'Area Legal',
    'Cumplimiento Regulatorio',
    'Organizacion y Metodos',
    'Activos Eventuales',
    'Proveduria',
    'Cobranzas Electronicas',
    'Jefe de Recursos Humanos',
    'Auxiliar Recursos Humanos',
    'Archivo RRHH',
    'Operaciones',
    'Jefe de Servicios Generales',
    'Servicios Generales',
    'Correspondencia',
    'Mantenimiento',
    'Archivo Prestamos',
    'Archivo Caja',
    'Jefe de Seguridad',
    'Lobby Seguridad',
    'Seguridad Parqueo',
    'Parqueo',
    'Sala de Juntas',
    'Sala Reuniones Dor Jorge Bueso',
    'Sala Reuniones Contiguo RRHHH',
    'Cafeteria',
    'Cocineta',
    'Supervisor de Ag. Foraneas',
    'Supervisor de Ag. Locales',
    'Encargado Activos Fijos',
    'Aux. Activos Fijos',
    'Jefe Agropecario',
    'Agropecario / Oficial credito',
    'Agropecario / Secretaria',
    'Agropecario / Oficial Credito',
    'Agropecuaria',
    'Tecnico Evaluadores',
    'Jefe Tesoreria',
    'Asistente Tesoreria',
    'Gerencia',
    'Funcionario de Caja',
    'Boveda',
    'Prestamos',
    'Lobby',
    'Archivo',
    'Parquo Sotano',
    'Sala de Reuniones',
    'Coordinador Operativo',
    'Supervisor Auto Banco',
    'Oficial Junior',
    'Jefe PIFI',
    'Supervisor PIFI',
    'Analista PIFI',
    'Cafeteria Primer Nivel',
    'Asistente Regional Control Interno',
    'Auxiliar Control Interno',
    'Auditor Interno Corporativo',
    'Asistente Interno Corporativo',
    'Asistente Jefe Regional Auditoria Interna',
    'Asistente Administrativo',
    'Auditor',
    'Auditor Financiero/Riesgo',
    'Auditor de Sucursales y Agencias',
    'Cafeteria Segunda Planta',
    'Jefe de Video Seguirdad',
    'Auxiliar',
    'Jefe de Cumplimineto',
    'Cumplimineto',
    'Caja',
    'Cuarto de Comunicaciones',
    'Jefe de Transacciones',
    'Auxiliar de Transacciones',
    'Seguridad',

  ];
  // Verificar cuántos de los departamentos ya existen
  const checkDepartamentosSQL = `
    SELECT COUNT(*) as count FROM departamentos WHERE nombre IN (${departamentos.map(() => '?').join(', ')});
  `;

  // Ejecutar consulta para verificar los departamentos existentes
  const [rows]: any = await connection.query(checkDepartamentosSQL, departamentos);

  // Si no hay departamentos existentes, proceder a insertarlos
  if (rows[0].count === 0) {
    const insertDepartamentosSQL = `
      INSERT INTO departamentos (nombre) VALUES 
      ${departamentos.map(() => '(?)').join(', ')}; 
    `;

    await connection.query(insertDepartamentosSQL, departamentos);
    console.log('Departamentos insertados:', departamentos);
  } else {
    console.log('Algunos departamentos ya existen, no se realizará la inserción.');
  }
};

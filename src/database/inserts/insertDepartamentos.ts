import { Connection } from 'mysql2/promise';

// Función para insertar los departamentos si no existen
export const insertDepartamentos = async (connection: Connection) => {
  // Nombres de los departamentos
  const departamentos = [
    'Gerencia',
    'Secretaria de Gerencia',
    'Funcionario de Caja',
    'Supervisores de Caja',
    'Boveda',
    'Atención al Cliente',
    'Oficial de Créditos',
    'Analista de Crédito',
    'Contabilidad',
    'Préstamos',
    'Recuperaciones',
    'Auxiliar de RRHH',
    'Archivo',
    'Lobby',
    'Parqueo',
    'Sala de Reuniones',
    'Cafetería',
    'Comedor',
    'Agropecuaria',
    'Coordinador Operativo',
    'Jefe PIFI',
    'Supervisor PIFI',
    'Gestor de Atención al Cliente',
    'Servicios Generales (Cafetería)',
    'Preboveda',
    'NOC',
    'Jefe de Taller',
    'Taller',
    'Jefe Soporte Técnico',
    'Soporte Técnico',
    'Usuarios Expertos',
    'Recepción Telefónica',
    'Gerente Regional TI - Zona Occidente',
    'Presidente Banco',
    'Gerente de Caja',
    'Asistente Gerente de Caja',
    'Depositos a Domicilio',
    'Jefe Atención al Cliente',
    'Secretaria Oficiales de Créditos',
    'Jefe de Análisis de Crédito',
    'Jefe de Internacional',
    'Contador General',
    'Jefe de Préstamos',
    'Auxiliar de Préstamos',
    'Jefe de Tarjetas Visa',
    'Gestores de Tarjetas Visa',
    'Jefe de Fideicomiso',
    'Fideicomiso',
    'Jefe Regional de Recuperaciones',
    'Asistente Recuperaciones',
    'Área Legal',
    'Cumplimiento Regulatorio',
    'Organización y Métodos',
    'Activos Eventuales',
    'Proveduría',
    'Cobranzas Electrónicas',
    'Jefe de Recursos Humanos',
    'Auxiliar Recursos Humanos',
    'Jefe de Servicios Generales',
    'Servicios Generales',
    'Correspondencia',
    'Mantenimiento',
    'Jefe de Seguridad',
    'Lobby Seguridad',
    'Seguridad Parqueo',
    'Sala de Juntas',
    'Encargado Activos Fijos',
    'Aux. Activos Fijos',
    'Jefe Agropecuario',
    'Técnicos Evaluadores',
    'Jefe Tesorería',
    'Asistente Tesorería',
    'Cuarto de Comunicaciones',
    'Gestor de Atención al Cliente',
    'Jefe de Transacciones',
    'Auxiliar de Transacciones',
    'Mercadeo',
    'Supervisión II',
    'Créditos',
    'Análisis de Créditos',
    'Operaciones',
    'Control Interno',
    'Caja',
    'Gerente',
    'Administración de Telefonía',
    'Sala de Capacitaciones ',

  ];
''
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

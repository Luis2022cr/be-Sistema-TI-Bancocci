import { Connection } from 'mysql2/promise';

// Función para insertar los datos en la tabla directorios
export const insertDirectorios = async (connection: Connection) => {
  // Datos para insertar en la tabla directorios
  const directorios = [
    //directorio TI
    { extension: 100003, departamento_id: 1, agencias_id: 5, empleado: 'Mario Belarmino Contreras' }, // Gerente Regional TI - Zona Occidente
    { extension: 100036, departamento_id: 2, agencias_id: 5, empleado: 'Jose Raul Trochez Garcia' },   // Administración de Telefonía
    { extension: 100040, departamento_id: 3, agencias_id: 5, empleado: 'Roberto Josue Perdomo' },      // Jefe Soporte Técnico
    { extension: 100041, departamento_id: 4, agencias_id: 5, empleado: 'Emnio Josue Ramos' },          // Soporte Técnico 1
    { extension: 100042, departamento_id: 4, agencias_id: 5, empleado: 'Daniel Arnulfo Casasola' },    // Soporte Técnico 2
    { extension: 100050, departamento_id: 5, agencias_id: 5, empleado: 'Victor Josue Dubon' },         // Jefe de Taller
    { extension: 100051, departamento_id: 6, agencias_id: 5, empleado: 'Nicky Josue Ramos' },          // Taller 1
    { extension: 100052, departamento_id: 6, agencias_id: 5, empleado: 'Alan Flores Delcil' },        // Taller 2
    { extension: 100053, departamento_id: 6, agencias_id: 5, empleado: 'Jenry Alberto Castellanos' },   // Taller 3
    { extension: 100061, departamento_id: 7, agencias_id: 5, empleado: 'Maria Judith Miranda' },        // Usuarios Expertos
    { extension: 100530, departamento_id: 8, agencias_id: 5, empleado: 'TI' },                         // Sala de Reuniones
    { extension: 100019, departamento_id: 9, agencias_id: 5, empleado: 'TI' },                         // Sala de Capacitaciones
    { extension: 100010, departamento_id: 10, agencias_id: 5, empleado: 'TI' },                         // NOC
    { extension: 100542, departamento_id: 11, agencias_id: 5, empleado: 'TI' },                         // Cafetería
    // Nuevos datos a insertar Agenica 111
    { extension: 111001, departamento_id: 80, agencias_id: 4, empleado: 'ANGEL ANTONIO TABORA TABORA' }, // GERENCIA
    { extension: 111012, departamento_id: 19, agencias_id: 4, empleado: 'OSCAR ARMANDO TABORA GOMEZ' }, // SUPERVISOR DE CAJA
    { extension: 111013, departamento_id: 19, agencias_id: 4, empleado: 'JOSE LUIS HERNANDEZ PERDOMO' }, // SUPERVISOR DE CAJA
    { extension: 111014, departamento_id: 89, agencias_id: 4, empleado: 'JOSUE DANIEL ZALDIVAR RODRIGUEZ' }, // SUPERVISOR DE CAJA AUTOBANCO
    { extension: 111015, departamento_id: 82, agencias_id: 4, empleado: 'ALLAN OMAR FLORES DELCID' },    // BOVEDA DE CAJA
    { extension: 111021, departamento_id: 23, agencias_id: 4, empleado: 'JENNY MARLEN CASTELLANOS' },    // ATENCIÓN AL CLIENTE No. 1
    { extension: 111022, departamento_id: 23, agencias_id: 4, empleado: 'NERISSA ALEJANDRA CABALLERO PINEDA' }, // ATENCIÓN AL CLIENTE No. 2
    { extension: 111540, departamento_id: 94, agencias_id: 4, empleado: 'MARIA SANTOS TEJADA' },        // CAFETERIA PRIMER NIVEL
    { extension: 111390, departamento_id: 95, agencias_id: 4, empleado: 'GLENDA LEMUS' },               // ASISTENTE REGIONAL CONTROL INTERNO
    { extension: 111391, departamento_id: 96, agencias_id: 4, empleado: 'MIRIAN MERCADO' },             // AUXILIAR CONTROL INTERNO
    { extension: 111392, departamento_id: 96, agencias_id: 4, empleado: 'MIRIAN NOHEMY CRUZ' },        // AUXILIAR CONTROL INTERNO
    { extension: 111393, departamento_id: 96, agencias_id: 4, empleado: 'IRMA HONORIA MELGAR' },       // AUXILIAR CONTROL INTERNO
    { extension: 111394, departamento_id: 96, agencias_id: 4, empleado: 'REINA ISABEL MADRID' },       // AUXILIAR CONTROL INTERNO
    { extension: 111395, departamento_id: 96, agencias_id: 4, empleado: 'NORMA HERNANDEZ MARTINEZ' },  // AUXILIAR CONTROL INTERNO
    { extension: 111396, departamento_id: 96, agencias_id: 4, empleado: 'VILMA ISABEL GARCIA' },      // AUXILIAR CONTROL INTERNO
    { extension: 111397, departamento_id: 96, agencias_id: 4, empleado: 'LESLIE ELIZABETH CHINCHILLA MEJIA' }, // AUXILIAR CONTROL INTERNO
    { extension: 111398, departamento_id: 96, agencias_id: 4, empleado: 'SILVIA VANESSA ALBERTO' },   // AUXILIAR CONTROL INTERNO
    { extension: 111399, departamento_id: 96, agencias_id: 4, empleado: 'MARIA LUISA DIAZ' },         // AUXILIAR CONTROL INTERNO
    { extension: 111310, departamento_id: 97, agencias_id: 4, empleado: 'José Fausto Orellana Córdova' }, // Auditor Interno Corporativo
    { extension: 111311, departamento_id: 98, agencias_id: 4, empleado: 'Edgar Abraham Ayala' },       // Asistente Auditor Interno Corporativo
    { extension: 111312, departamento_id: 99, agencias_id: 4, empleado: 'Roy A. Mejía' },             // Asistente Jefe Regional Auditoría Interna
    { extension: 111313, departamento_id: 100, agencias_id: 4, empleado: 'Sobeida Y. Valenzuela' },    // Asistente Administrativo
    { extension: 111314, departamento_id: 101, agencias_id: 4, empleado: 'José Angel Hernández F.' },   // Auditor
    { extension: 111315, departamento_id: 102, agencias_id: 4, empleado: 'Wendy Lisseth Sanabria' },    // Auditor Financiero/Riesgo
    { extension: 111316, departamento_id: 102, agencias_id: 4, empleado: 'Omar Alexánder Hernández' },  // Auditor Financiero/Riesgo
    { extension: 111317, departamento_id: 103, agencias_id: 4, empleado: 'Dennis Fernando Casaca' },    // Auditor de Sucursales y Agencias
    { extension: 111318, departamento_id: 103, agencias_id: 4, empleado: 'Francisco Javier Mejía' },    // Auditor de Sucursales y Agencias
    { extension: 111319, departamento_id: 102, agencias_id: 4, empleado: 'Oscar Arnaldo García P.' },   // Auditor Financiero/Riesgo
    { extension: 111320, departamento_id: 103, agencias_id: 4, empleado: 'Julissa Mercedes Escobar' },  // Auditor de Sucursales y Agencias
    { extension: 111541, departamento_id: 104, agencias_id: 4, empleado: 'TI' },                       // Cafetería II planta
    { extension: 111512, departamento_id: 105, agencias_id: 4, empleado: 'Erick Mauricio Castillo' },   // Jefe de Video Seguridad
    { extension: 111513, departamento_id: 106, agencias_id: 4, empleado: 'Marlon Brando Torres Servellon' }, // Auxiliar 1
    { extension: 111514, departamento_id: 106, agencias_id: 4, empleado: 'Luis Fernandos Santos' },      // Auxiliar 2
    { extension: 111515, departamento_id: 106, agencias_id: 4, empleado: 'Luis Edgardo Garcia' },       // Auxiliar 3
    { extension: 111516, departamento_id: 106, agencias_id: 4, empleado: 'Cristian Enamorado' },       // Auxiliar 4
    { extension: 111330, departamento_id: 107, agencias_id: 4, empleado: 'Evliyn Ebrineth Muñoz Lopez' }, // Jefe de Cumplimiento
    { extension: 111331, departamento_id: 108, agencias_id: 4, empleado: 'Catalina Molina Sanchez' },    // Cumplimiento 1
    { extension: 111332, departamento_id: 108, agencias_id: 4, empleado: 'Adonis Josue Espinoza Ramirez' }, // Cumplimiento 2
    { extension: 111333, departamento_id: 108, agencias_id: 4, empleado: 'Yesica Yohana Ordoñez Sibrian' }, // Cumplimiento 3
    { extension: 111334, departamento_id: 108, agencias_id: 4, empleado: 'Marcia Alejandra Madrid' },     // Cumplimiento 4

    //directrio 101
    { extension: 101000, departamento_id: 12, agencias_id: 1, empleado: 'Recepción Telefónica' },
    { extension: 101002, departamento_id: 13, agencias_id: 1, empleado: 'Juan Miguel Alvarenga Bautista' },
    { extension: 101005, departamento_id: 14, agencias_id: 1, empleado: 'Presidente Banco' },
    { extension: 101006, departamento_id: 15, agencias_id: 1, empleado: 'Lourdes Alvarado' },
    { extension: 101007, departamento_id: 16, agencias_id: 1, empleado: 'Lucila Dubon' },
    { extension: 101008, departamento_id: 16, agencias_id: 1, empleado: 'Karla Patricia Enamora Diaz' },
    { extension: 101010, departamento_id: 17, agencias_id: 1, empleado: 'Leidy Mirea Perez' },
    { extension: 101011, departamento_id: 18, agencias_id: 1, empleado: 'Ariel Mejia' },
    { extension: 101012, departamento_id: 19, agencias_id: 1, empleado: 'Rotativo' },
    { extension: 101013, departamento_id: 19, agencias_id: 1, empleado: 'Rotativo' },
    { extension: 101014, departamento_id: 19, agencias_id: 1, empleado: 'Rotativo' },
    { extension: 101015, departamento_id: 20, agencias_id: 1, empleado: 'Rotativo' },
    { extension: 101016, departamento_id: 19, agencias_id: 1, empleado: 'Rotativo' },
    { extension: 101017, departamento_id: 21, agencias_id: 1, empleado: 'Cajero Domicilio' },
    { extension: 101018, departamento_id: 19, agencias_id: 1, empleado: 'Rotativo' },
    { extension: 101020, departamento_id: 22, agencias_id: 1, empleado: 'Mirna Roxani Castro Argueta' },
    { extension: 101021, departamento_id: 23, agencias_id: 1, empleado: 'Nayeli Lilbeth Cruz Escalante' },
    { extension: 101022, departamento_id: 23, agencias_id: 1, empleado: 'Yanenyn Gabriela Urbiina Paz' },
    { extension: 101023, departamento_id: 23, agencias_id: 1, empleado: 'Amsi Abigail Hernandez Peraza' },
    { extension: 101024, departamento_id: 23, agencias_id: 1, empleado: 'Andre Josecarlo Santos Hernandez' },
    { extension: 101025, departamento_id: 23, agencias_id: 1, empleado: 'Gabriela Sarahi Orellana Duque' },
    { extension: 101026, departamento_id: 23, agencias_id: 1, empleado: 'Wendy Roxana Tejada Peña' },
    { extension: 101027, departamento_id: 23, agencias_id: 1, empleado: 'Wendy Yackeline Flores Tabora' },
    { extension: 101028, departamento_id: 23, agencias_id: 1, empleado: 'Wendy Yackeline Flores Tabora' },
    { extension: 101040, departamento_id: 24, agencias_id: 1, empleado: 'Jorge Serrano' },
    { extension: 101041, departamento_id: 25, agencias_id: 1, empleado: 'Renan Arita' },
    { extension: 101042, departamento_id: 25, agencias_id: 1, empleado: 'Eduardo Rodriguez' },
    { extension: 101043, departamento_id: 25, agencias_id: 1, empleado: 'Javier Arita' },
    { extension: 101044, departamento_id: 25, agencias_id: 1, empleado: 'Yester Caballero' },
    { extension: 101046, departamento_id: 26, agencias_id: 1, empleado: 'Ivette Maricela Moya Cruz' },
    { extension: 101070, departamento_id: 27, agencias_id: 1, empleado: 'Iris Milagros Viera' },
    { extension: 101071, departamento_id: 28, agencias_id: 1, empleado: 'Antonelly Jose Orellana' },
    { extension: 101072, departamento_id: 28, agencias_id: 1, empleado: 'Dayra Yareth Herrara Fuentes' },
    { extension: 101073, departamento_id: 28, agencias_id: 1, empleado: 'Lurbin Edith Alvarez' },
    { extension: 101074, departamento_id: 28, agencias_id: 1, empleado: 'Arnold Caballero Flores' },
    { extension: 101075, departamento_id: 28, agencias_id: 1, empleado: 'Cinzzia Lariza Maldonado' },
    { extension: 101076, departamento_id: 28, agencias_id: 1, empleado: 'Henry Adan Castellanos' },
    { extension: 101077, departamento_id: 28, agencias_id: 1, empleado: 'Gabriel Antonio Garcia Ramirez' },
    { extension: 101090, departamento_id: 29, agencias_id: 1, empleado: 'Amariles Yanira Pineda' },
    { extension: 101091, departamento_id: 30, agencias_id: 1, empleado: 'No Asignada' },
    { extension: 101092, departamento_id: 30, agencias_id: 1, empleado: 'Jose Armando Amaya' },
    { extension: 101110, departamento_id: 31, agencias_id: 1, empleado: 'Edgar Alexis Arita Hernandez' },
    { extension: 101111, departamento_id: 32, agencias_id: 1, empleado: 'Claudia Benigna Posadas' },
    { extension: 101112, departamento_id: 32, agencias_id: 1, empleado: 'Karina Yesenia Nuñez' },
    { extension: 101113, departamento_id: 32, agencias_id: 1, empleado: 'Cindy Yarely Calidonio' },
    { extension: 101114, departamento_id: 32, agencias_id: 1, empleado: 'No Asignada' },
    { extension: 101115, departamento_id: 32, agencias_id: 1, empleado: 'Lesbia Isolina Miranda Castillo' },
    { extension: 101116, departamento_id: 32, agencias_id: 1, empleado: 'Ovilia Yaneth Mateo' },
    { extension: 101117, departamento_id: 32, agencias_id: 1, empleado: 'No Asignada' },
    { extension: 101118, departamento_id: 32, agencias_id: 1, empleado: 'Maryorie Yolibeth Santos Contreras' },
    { extension: 101140, departamento_id: 33, agencias_id: 1, empleado: 'Irma Cristina Dubon' },
    { extension: 101141, departamento_id: 34, agencias_id: 1, empleado: 'Delmi Sagrario Portillo Orellana' },
    { extension: 101142, departamento_id: 34, agencias_id: 1, empleado: 'Dubbys Jared Paz Moya' },
    { extension: 101143, departamento_id: 34, agencias_id: 1, empleado: 'Nery Alfredo Hernandez' },
    { extension: 101144, departamento_id: 34, agencias_id: 1, empleado: 'Florencio Eduardo Aragon Vasquez' },
    { extension: 101145, departamento_id: 34, agencias_id: 1, empleado: 'Karen Lizeth Orellana' },
    { extension: 101146, departamento_id: 34, agencias_id: 1, empleado: 'Bety Esperanza Barnica Chacon' },
    { extension: 101147, departamento_id: 34, agencias_id: 1, empleado: 'Gloria Janeth Gonzales Pineda' },
    { extension: 101148, departamento_id: 34, agencias_id: 1, empleado: 'Estefany Cecilia Melgar Gonzalez' },
    { extension: 101149, departamento_id: 34, agencias_id: 1, empleado: 'Reyna Suyapa Alvarado' },
    { extension: 101150, departamento_id: 34, agencias_id: 1, empleado: 'Sadit Omar Gomez Sarmiento' },
    { extension: 101151, departamento_id: 34, agencias_id: 1, empleado: 'Oscar Miguel Cruz Banegas' },
    { extension: 101152, departamento_id: 34, agencias_id: 1, empleado: 'Virginia Lara Castañeda' },
    { extension: 101153, departamento_id: 34, agencias_id: 1, empleado: 'Ondina Griselda Gomez Ramos' },
    { extension: 101154, departamento_id: 34, agencias_id: 1, empleado: 'Kevin Hodayer Enamorado Perdomo' },
    { extension: 101155, departamento_id: 34, agencias_id: 1, empleado: 'Erith Josue Aguilar Recinos' },
    { extension: 101156, departamento_id: 34, agencias_id: 1, empleado: 'Karla Xiomara Madrid Castillo' },
    { extension: 101157, departamento_id: 34, agencias_id: 1, empleado: 'Damaris Suyapa Pineda Villeda' },
    { extension: 101158, departamento_id: 34, agencias_id: 1, empleado: 'Sonia Elizabeth Jimenez Hernandez' },
    { extension: 101159, departamento_id: 34, agencias_id: 1, empleado: 'Marlen Xiomara Santos' },
    { extension: 101160, departamento_id: 34, agencias_id: 1, empleado: 'Maria Santos Hernandez' },
    { extension: 101161, departamento_id: 34, agencias_id: 1, empleado: 'Fernando Adolfo Pineda Ramirez' },
    { extension: 101162, departamento_id: 34, agencias_id: 1, empleado: 'Delia Nohemy Rivera Diaz' },
    { extension: 101163, departamento_id: 34, agencias_id: 1, empleado: 'Reina Argentina Mejia' },
    { extension: 101164, departamento_id: 34, agencias_id: 1, empleado: 'Maria Angelica Cortez Pacheco' },
    { extension: 101165, departamento_id: 34, agencias_id: 1, empleado: 'Lilian Eugenia Castellanos' },
    { extension: 101166, departamento_id: 34, agencias_id: 1, empleado: 'Heydy Estrella Bobadilla Erazo' },
    { extension: 101167, departamento_id: 34, agencias_id: 1, empleado: 'Omar Armando Mata' },
    { extension: 101168, departamento_id: 34, agencias_id: 1, empleado: 'Darwin Ariel Sanchez Menjivar' },
    { extension: 101169, departamento_id: 34, agencias_id: 1, empleado: 'Cesar Rodolfo Sarmiento Flores' },
    { extension: 101170, departamento_id: 34, agencias_id: 1, empleado: 'Onociforo Trejo Muñoz' },
    { extension: 101180, departamento_id: 34, agencias_id: 1, empleado: 'No Asignada' },
    { extension: 101181, departamento_id: 34, agencias_id: 1, empleado: 'Julissa Nicolle Tabora Sanchez' },
    { extension: 101182, departamento_id: 34, agencias_id: 1, empleado: 'Francisco Javier Cortez' },
    { extension: 101183, departamento_id: 34, agencias_id: 1, empleado: 'Rigoberto Santos Maradiaga' },
    { extension: 101184, departamento_id: 34, agencias_id: 1, empleado: 'Bessy Karolina Portillo Lopez' },
    { extension: 101185, departamento_id: 34, agencias_id: 1, empleado: 'Doris Elizabeth Escobar Romero' },
    { extension: 101190, departamento_id: 35, agencias_id: 1, empleado: 'Jesus Ramirez' },
    { extension: 101191, departamento_id: 36, agencias_id: 1, empleado: 'Henry Puerto' },
    { extension: 101192, departamento_id: 36, agencias_id: 1, empleado: 'Wuendy Xiomara Tabora' },
    { extension: 101193, departamento_id: 36, agencias_id: 1, empleado: 'Erick Perez' },
    { extension: 101194, departamento_id: 36, agencias_id: 1, empleado: 'Maynor Argueta' },
    { extension: 101195, departamento_id: 36, agencias_id: 1, empleado: 'Irma Arita' },
    { extension: 101196, departamento_id: 36, agencias_id: 1, empleado: 'Marlon Romero' },
    { extension: 101197, departamento_id: 36, agencias_id: 1, empleado: 'Deina Marisol Flores' },
    { extension: 101198, departamento_id: 36, agencias_id: 1, empleado: 'Allan Javier Chavez' },
    { extension: 101199, departamento_id: 36, agencias_id: 1, empleado: 'Stephanie Julissa Carballo' },
    { extension: 101230, departamento_id: 37, agencias_id: 1, empleado: 'Mercedes Carolina Granados' },
    { extension: 101231, departamento_id: 38, agencias_id: 1, empleado: 'Miriam Esperanza Flores' },
    { extension: 101232, departamento_id: 38, agencias_id: 1, empleado: 'Maugdiel De Jesus Erazo' },
    { extension: 101270, departamento_id: 39, agencias_id: 1, empleado: 'Marvin Antonio Quintanilla Sarmiento' },
    { extension: 101271, departamento_id: 40, agencias_id: 1, empleado: 'Maria Virginia Alvarado Bueso' },
    { extension: 101272, departamento_id: 41, agencias_id: 1, empleado: 'Cristian Perez' },
    { extension: 101273, departamento_id: 42, agencias_id: 1, empleado: 'Wilmer Jeovany Aleman Caballero' },
    { extension: 101301, departamento_id: 43, agencias_id: 1, empleado: 'Idania Elisa Martinez Moreira' },
    { extension: 101371, departamento_id: 44, agencias_id: 1, empleado: 'Heidy Lorena Melgar Gonzalez' },
    { extension: 101372, departamento_id: 44, agencias_id: 1, empleado: 'Rossy Alexandra Henrriquez Reyez' },
    { extension: 101381, departamento_id: 45, agencias_id: 1, empleado: 'Dilcia Ofelia Mejia Rivera' },
    { extension: 101375, departamento_id: 46, agencias_id: 1, empleado: 'Olvin Ramon Mayorga' },
    { extension: 101421, departamento_id: 47, agencias_id: 1, empleado: 'Nora Yolany Mercado Gomez' },
    { extension: 101430, departamento_id: 48, agencias_id: 1, empleado: 'Jose Limere Flores' },
    { extension: 101431, departamento_id: 48, agencias_id: 1, empleado: 'Silvia Maricela Dubon Villanueva' },
    { extension: 101450, departamento_id: 49, agencias_id: 1, empleado: 'Lourdes Yolibeth Alvarado Espinoza' },
    { extension: 101452, departamento_id: 50, agencias_id: 1, empleado: 'Victorina Galvez Pineda' },
    { extension: 101453, departamento_id: 50, agencias_id: 1, empleado: 'Andrea Moreno Pineda' },
    { extension: 101454, departamento_id: 50, agencias_id: 1, empleado: 'Marilu Caceres' },
    { extension: 101455, departamento_id: 50, agencias_id: 1, empleado: 'Deisy Gisela Dubon Mejia' },
    { extension: 101456, departamento_id: 50, agencias_id: 1, empleado: 'Mayra Lenin Flogar' },
    { extension: 101457, departamento_id: 50, agencias_id: 1, empleado: 'Silvia Carolina Contreras' },
    { extension: 101458, departamento_id: 50, agencias_id: 1, empleado: 'Sharon Yolibeth Pineda' },
    { extension: 101459, departamento_id: 51, agencias_id: 1, empleado: 'Archivo RRHH' },
    { extension: 101472, departamento_id: 52, agencias_id: 1, empleado: 'Jose Sandoval' },
    { extension: 101473, departamento_id: 52, agencias_id: 1, empleado: 'Marto Tulio Ayala Bueso' },
    { extension: 101480, departamento_id: 53, agencias_id: 1, empleado: 'Edwin Guillermo Pineda Caballero' },
    { extension: 101481, departamento_id: 54, agencias_id: 1, empleado: 'Carlos Mauricio Rios Diaz' },
    { extension: 101482, departamento_id: 55, agencias_id: 1, empleado: 'Maria Carmen Caballero de Perez' },
    { extension: 101483, departamento_id: 55, agencias_id: 1, empleado: 'Maura Argentina Diaz' },
    { extension: 101485, departamento_id: 56, agencias_id: 1, empleado: 'Adriana Larissa Carbajal' },
    { extension: 101490, departamento_id: 57, agencias_id: 1, empleado: 'Alejandra De Jesus Mejia Lara' },
    { extension: 101491, departamento_id: 58, agencias_id: 1, empleado: 'Marta Alicia Calidonio Alvarado' },
    { extension: 101510, departamento_id: 59, agencias_id: 1, empleado: 'Jose Ronald Santos' },
    { extension: 101520, departamento_id: 60, agencias_id: 1, empleado: 'Rotativo' },
    { extension: 101525, departamento_id: 61, agencias_id: 1, empleado: 'Rotativo' },
    { extension: 101530, departamento_id: 63, agencias_id: 1, empleado: 'Sala de Juntas' },
    { extension: 101531, departamento_id: 63, agencias_id: 1, empleado: 'Sala de Juntas' },
    { extension: 101532, departamento_id: 64, agencias_id: 1, empleado: 'Sala Reuniones Don Jorge Bueso' },
    { extension: 101533, departamento_id: 65, agencias_id: 1, empleado: 'Sala Reuniones Contiguo RRHH' },
    { extension: 101540, departamento_id: 66, agencias_id: 1, empleado: 'Cafeteria' },
    { extension: 101541, departamento_id: 67, agencias_id: 1, empleado: 'Cocineta' },
    { extension: 101550, departamento_id: 68, agencias_id: 1, empleado: 'Marcos Miranda' },
    { extension: 101551, departamento_id: 68, agencias_id: 1, empleado: 'Dimas Montoya' },
    { extension: 101552, departamento_id: 69, agencias_id: 1, empleado: 'Rafael Edgardo Argueta Hernandez' },
    { extension: 101560, departamento_id: 70, agencias_id: 1, empleado: 'Fabricio Karin Mejia' },
    { extension: 101561, departamento_id: 71, agencias_id: 1, empleado: 'Cesar Arnaldo Coto' },
    { extension: 101590, departamento_id: 72, agencias_id: 1, empleado: 'Jorge Isaac Hernandez' },
    { extension: 101591, departamento_id: 73, agencias_id: 1, empleado: 'David Ruiz' },
    { extension: 101592, departamento_id: 74, agencias_id: 1, empleado: 'Lilian Miranda' },
    { extension: 101593, departamento_id: 77, agencias_id: 1, empleado: 'Jesus Ochoa' },
    { extension: 101594, departamento_id: 77, agencias_id: 1, empleado: 'Maria Jose Alvarado Arita' },
    { extension: 101595, departamento_id: 77, agencias_id: 1, empleado: 'Milton Roel Estevez' },
    { extension: 101596, departamento_id: 77, agencias_id: 1, empleado: 'Emilio Vicente Enamorado' },
    { extension: 101597, departamento_id: 77, agencias_id: 1, empleado: 'Carlos Antonio Zu' },
    { extension: 101598, departamento_id: 77, agencias_id: 1, empleado: 'Alex Navarro' },
    { extension: 101599, departamento_id: 77, agencias_id: 1, empleado: 'Samuel Lopez' },
    { extension: 101600, departamento_id: 73, agencias_id: 1, empleado: 'Mario Alberto España' },
    { extension: 101670, departamento_id: 73, agencias_id: 1, empleado: 'Guillermo Donaire' },
    { extension: 101660, departamento_id: 78, agencias_id: 1, empleado: 'Edis Edgardo Trochez Claudino' },
    { extension: 101661, departamento_id: 79, agencias_id: 1, empleado: 'Miguel Angel Peña Fuentes' },
    { extension: 101662, departamento_id: 79, agencias_id: 1, empleado: 'Eblin Jesuita Coto' },

    // 102
    { extension: 102001, departamento_id: 80, agencias_id: 12, empleado: "Jose Anibal Martinez Bringuez" },
    { extension: 102008, departamento_id: 16, agencias_id: 12, empleado: "No Asignado" },
    { extension: 102011, departamento_id: 81, agencias_id: 12, empleado: "Reyna Elizabeth Veliz Fuentes" },
    { extension: 102012, departamento_id: 19, agencias_id: 12, empleado: "Oscar Natividad Caballero Gutierrez" },
    { extension: 102013, departamento_id: 19, agencias_id: 12, empleado: "Andrea Sofia Interiano Veliz" },
    { extension: 102015, departamento_id: 82, agencias_id: 12, empleado: "Nora Isabel Monroy Calderon" },
    { extension: 102021, departamento_id: 23, agencias_id: 12, empleado: "Dimelsa Janeth Salguero Vasquez" },
    { extension: 102022, departamento_id: 23, agencias_id: 12, empleado: "Claudia Jessenia Manchame" },
    { extension: 102023, departamento_id: 23, agencias_id: 12, empleado: "Tanya Kiabeth Rosa Guillen" },
    { extension: 102024, departamento_id: 23, agencias_id: 12, empleado: "Jose Luis Sanabria Martinez" },
    { extension: 102041, departamento_id: 25, agencias_id: 12, empleado: "Walter Nahun Lopez Garcia" },
    { extension: 102042, departamento_id: 25, agencias_id: 12, empleado: "Carlos Roberto Aldana Torres" },
    { extension: 102043, departamento_id: 25, agencias_id: 12, empleado: "Manuel Antonio Perez Rodriguez" },
    { extension: 102071, departamento_id: 28, agencias_id: 12, empleado: "Junior Alberto Ramos Garcia" },
    { extension: 102072, departamento_id: 28, agencias_id: 12, empleado: "Hugo Leonel Ramos" },
    { extension: 102111, departamento_id: 32, agencias_id: 12, empleado: "Caleb Antonio Rodriguez Lorenzo" },
    { extension: 102142, departamento_id: 83, agencias_id: 12, empleado: "Melvin Humberto Raymundo Perez" },
    { extension: 102143, departamento_id: 83, agencias_id: 12, empleado: "No Asignado" },
    { extension: 102144, departamento_id: 83, agencias_id: 12, empleado: "Raul Danery Sarmiento Martinez" },
    { extension: 102271, departamento_id: 41, agencias_id: 12, empleado: "Tania Ivonn Garza Alvarenga" },
    { extension: 102452, departamento_id: 50, agencias_id: 12, empleado: "Reyna Elizabeth Veliz Fuentes" },
    { extension: 102490, departamento_id: 85, agencias_id: 12, empleado: "Celea Salguero Jacome" },
    { extension: 102520, departamento_id: 84, agencias_id: 12, empleado: "Porfirio Garza Salvador" },
    { extension: 102525, departamento_id: 86, agencias_id: 12, empleado: "Cristian Eduardo Madrid Morales" },
    { extension: 102530, departamento_id: 87, agencias_id: 12, empleado: "Polycon" },
    { extension: 102531, departamento_id: 87, agencias_id: 12, empleado: "Raul Danery Sarmiento" },
    { extension: 102540, departamento_id: 94, agencias_id: 12, empleado: "Maritza Ramos Rodriguez" },
    { extension: 102594, departamento_id: 76, agencias_id: 12, empleado: "Rafael Anibal Flors Mendez" }
  

  ];

  // Extraer todas las extensiones
  const extensions = directorios.map(({ extension }) => extension);

  // Verificar si alguna de las extensiones ya existe
  const checkDirectorioSQL = `
    SELECT COUNT(*) as count FROM directorios WHERE extension IN (${extensions.map(() => '?').join(', ')});
  `;

  // Ejecutar la consulta de verificación
  const [checkRows]: any = await connection.query(checkDirectorioSQL, extensions);

  // Si existe al menos un directorio, cancelar inserción
  if (checkRows[0].count > 0) {
    console.log(`Ya existe al menos un directorio con alguna de las extensiones proporcionadas. No se realizará la inserción.`);
    return;
  }

  // Si no existen, insertar todos los directorios
  const insertDirectorioSQL = `
    INSERT INTO directorios (extension, departamento_id, agencias_id, empleado) 
    VALUES (?, ?, ?, ?);
  `;

  try {
    for (const { extension, departamento_id, agencias_id, empleado } of directorios) {
      await connection.query(insertDirectorioSQL, [extension, departamento_id, agencias_id, empleado]);
      console.log(`Directorio insertado: ${empleado} con extensión ${extension}`);
    }
  } catch (error) {
    console.error('Error al insertar los directorios:', error);
  }
};

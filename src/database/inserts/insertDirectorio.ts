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
    { extension: 102594, departamento_id: 76, agencias_id: 12, empleado: "Rafael Anibal Flors Mendez" },

    //Agencia 103
    { extension: 103001, departamento_id: 80, agencias_id: 14, empleado: 'Manuel Antonio Paredes Tejada' },
    { extension: 103003, departamento_id: 88, agencias_id: 14, empleado: 'Ermes Elias Contreras Murcia' },
    { extension: 103008, departamento_id: 16, agencias_id: 14, empleado: 'Sonia Yaneth Hernandez Ramos' },
    { extension: 103011, departamento_id: 19, agencias_id: 14, empleado: 'Reina Xiomara Coello Romero' },
    { extension: 103012, departamento_id: 19, agencias_id: 14, empleado: 'Lurvin Erayda Ramirez Lopez' },
    { extension: 103013, departamento_id: 19, agencias_id: 14, empleado: 'Laura Noemi Lopez Morales' },
    { extension: 103014, departamento_id: 89, agencias_id: 14, empleado: 'Tania Ernestina Figueroa Garcia' },
    { extension: 103015, departamento_id: 20, agencias_id: 14, empleado: 'Gustavo Enrique Alvarenga Jaco' },
    { extension: 103021, departamento_id: 23, agencias_id: 14, empleado: 'Kevin Josue Morales Menjivar' },
    { extension: 103022, departamento_id: 23, agencias_id: 14, empleado: 'Dania Patricia Castaneda Cardoza' },
    { extension: 103023, departamento_id: 23, agencias_id: 14, empleado: 'Nelly Yamileth Cruz Funez' },
    { extension: 103024, departamento_id: 23, agencias_id: 14, empleado: 'Jenny Barrera Gutierrez' },
    { extension: 103041, departamento_id: 25, agencias_id: 14, empleado: 'Maria Angelina Hernandez' },
    { extension: 103042, departamento_id: 25, agencias_id: 14, empleado: 'Esmy Jorleny Contreras Mejia' },
    { extension: 103043, departamento_id: 25, agencias_id: 14, empleado: 'Mario Francisco Hernandez' },
    { extension: 103044, departamento_id: 25, agencias_id: 14, empleado: 'Florentino Lopez Giron' },
    { extension: 103071, departamento_id: 28, agencias_id: 14, empleado: 'Edwin Fernando Guerra' },
    { extension: 103072, departamento_id: 28, agencias_id: 14, empleado: 'Floridalma Chinchilla Ayala' },
    { extension: 103111, departamento_id: 32, agencias_id: 14, empleado: 'Carlos Humberto Santos Cruz' },
    { extension: 103142, departamento_id: 83, agencias_id: 14, empleado: 'Brenda Maritza Garcia Martinez' },
    { extension: 103271, departamento_id: 41, agencias_id: 14, empleado: 'Gerson Manuel Santos Morales' },
    { extension: 103490, departamento_id: 85, agencias_id: 14, empleado: 'Elsa Patricia Chavarria Guevara' },
    { extension: 103525, departamento_id: 62, agencias_id: 14, empleado: 'Guardia De Turno' },
    { extension: 103540, departamento_id: 66, agencias_id: 14, empleado: 'Encargado' },
    { extension: 103594, departamento_id: 76, agencias_id: 14, empleado: 'Odin Alejandro Lopez Romero' },
    
    // Agencia 104
    { extension: 104001, departamento_id: 80, agencias_id: 19, empleado: 'Erick Eduardo Trochez' },
  { extension: 104011, departamento_id: 81, agencias_id: 19, empleado: 'Angela Ismenia Vargas' },
  { extension: 104012, departamento_id: 19, agencias_id: 19, empleado: 'Fatima Del Carmen Cortes' },
  { extension: 104013, departamento_id: 19, agencias_id: 19, empleado: 'Erlan Vitelio Hernandez' },
  { extension: 104014, departamento_id: 89, agencias_id: 19, empleado: 'Milgian Reyes' },
  { extension: 104015, departamento_id: 20, agencias_id: 19, empleado: 'Orling Martinez Martinez' },
  { extension: 104021, departamento_id: 23, agencias_id: 19, empleado: 'Margarita Menjivar' },
  { extension: 104022, departamento_id: 23, agencias_id: 19, empleado: 'Delmy Feliciana Reyes' },
  { extension: 104023, departamento_id: 23, agencias_id: 19, empleado: 'Mirna Yamileth Tejada' },
  { extension: 104024, departamento_id: 23, agencias_id: 19, empleado: 'Doris Valeriano Bajurto' },
  { extension: 104041, departamento_id: 25, agencias_id: 19, empleado: 'Fermely Martinez Sorto' },
  { extension: 104042, departamento_id: 25, agencias_id: 19, empleado: 'Dinia Yareli Mejia' },
  { extension: 104043, departamento_id: 25, agencias_id: 19, empleado: 'Rafael Madrid' },
  { extension: 104071, departamento_id: 28, agencias_id: 19, empleado: 'Pricila Aguilar Turcios' },
  { extension: 104111, departamento_id: 32, agencias_id: 19, empleado: 'Roney Manuel Caceres' },
  { extension: 104142, departamento_id: 83, agencias_id: 19, empleado: 'Francisco Sarmiento' },
  { extension: 104271, departamento_id: 41, agencias_id: 19, empleado: 'Lucio Chacon Sanchez' },
  { extension: 104490, departamento_id: 85, agencias_id: 19, empleado: 'Fernanda Calderon' },
  { extension: 104525, departamento_id: 62, agencias_id: 19, empleado: 'Jose Maria Acosta' },
  { extension: 104530, departamento_id: 87, agencias_id: 19, empleado: 'No Asignado' },
  { extension: 104540, departamento_id: 67, agencias_id: 19, empleado: 'Blanca Deysi Chavez' },
  { extension: 104541, departamento_id: 66, agencias_id: 19, empleado: 'Maria Albertina Orellana' },

  //Agecnia 105
  { extension: 105001, departamento_id: 80, agencias_id: 21, empleado: 'Xavier Mauricio Santos Urquia' },
  { extension: 105003, departamento_id: 88, agencias_id: 21, empleado: 'Eda Ruth Espinoza Guerra' },
  { extension: 105008, departamento_id: 90, agencias_id: 21, empleado: 'Edna Judith Carvajal Garcia' },
  { extension: 105012, departamento_id: 17, agencias_id: 21, empleado: 'Delmy Everilda Melgar Rivera' },
  { extension: 105013, departamento_id: 19, agencias_id: 21, empleado: 'Elvia Mercedes Pineda Peraza' },
  { extension: 105014, departamento_id: 19, agencias_id: 21, empleado: 'Ana Rosa Guerra Fuentes' },
  { extension: 105017, departamento_id: 19, agencias_id: 21, empleado: 'Lilian Elizabeth Miranda Mejia' },
  { extension: 105015, departamento_id: 20, agencias_id: 21, empleado: 'Deivir Lenin Henriquez' },
  { extension: 105021, departamento_id: 23, agencias_id: 21, empleado: 'Mario Orfilia Melgar Gavarrete' },
  { extension: 105022, departamento_id: 23, agencias_id: 21, empleado: 'Pend.' },
  { extension: 105023, departamento_id: 23, agencias_id: 21, empleado: 'Gladis Yolanda Vasquez Vasquez' },
  { extension: 105024, departamento_id: 23, agencias_id: 21, empleado: 'Glenda Jaqueline Rivera' },
  { extension: 105025, departamento_id: 23, agencias_id: 21, empleado: 'Nancy Patricia Sanabria Pleitez' },
  { extension: 105041, departamento_id: 25, agencias_id: 21, empleado: 'Alvaro Raul Santamaria' },
  { extension: 105042, departamento_id: 25, agencias_id: 21, empleado: 'Erick Xavier Rodezno' },
  { extension: 105043, departamento_id: 25, agencias_id: 21, empleado: 'Karen Beatriz Guevara Lopez' },
  { extension: 105071, departamento_id: 28, agencias_id: 21, empleado: 'Olman Elam Sanchez Reyes' },
  { extension: 105111, departamento_id: 32, agencias_id: 21, empleado: 'Claudia Yessenia Gomez Deras' },
  { extension: 105142, departamento_id: 83, agencias_id: 21, empleado: 'Jorge Geovany Guerra Garcia' },
  { extension: 105490, departamento_id: 85, agencias_id: 21, empleado: 'No Asignado' },
  { extension: 105525, departamento_id: 113, agencias_id: 21, empleado: 'No Asignado' },
  { extension: 105540, departamento_id: 66, agencias_id: 21, empleado: 'No Asignado' },
  { extension: 105594, departamento_id: 76, agencias_id: 21, empleado: 'Nicomedes Espinoza Ortega' },
  { extension: 105531, departamento_id: 63, agencias_id: 21, empleado: 'No Asignado' },

  // gencia 106
  { extension: 106001, departamento_id: 80, agencias_id: 15, empleado: 'Cesia Carmi Mejia' },
  { extension: 106012, departamento_id: 19, agencias_id: 15, empleado: 'Senia Yanet Enamorado Fuentes' },
  { extension: 106013, departamento_id: 19, agencias_id: 15, empleado: 'Kenia Marina Lopez' },
  { extension: 106021, departamento_id: 23, agencias_id: 15, empleado: 'Edvin Ariel Ferrera Mejia' },
  { extension: 106022, departamento_id: 23, agencias_id: 15, empleado: 'Cindy Karolina Serrano Miranda' },

    //Agecnia 107
    { extension: 107001, departamento_id: 80, agencias_id: 37, empleado: 'Iris Marlen Pinto Rivas' },
    { extension: 107008, departamento_id: 3, agencias_id: 37, empleado: 'Nancy Roselim Arita Hernandez' },
    { extension: 107012, departamento_id: 19, agencias_id: 37, empleado: 'Yolanda Elizabeth Carranza' },
    { extension: 107013, departamento_id: 19, agencias_id: 37, empleado: 'Orly Fernando Palma Aquino' },
    { extension: 107015, departamento_id: 20, agencias_id: 37, empleado: 'Reyna Suyapa Pinto Rodriguez' },
    { extension: 107021, departamento_id: 88, agencias_id: 37, empleado: 'Jovany Noe Hernandez' },
    { extension: 107022, departamento_id: 23, agencias_id: 37, empleado: 'Marta Jeaneth Peraza Chinchilla' },
    { extension: 107023, departamento_id: 23, agencias_id: 37, empleado: 'Mayeni Auxiliadora Padilla Moran' },
    { extension: 107024, departamento_id: 23, agencias_id: 37, empleado: 'Elba Yolany Baca Regalado' },
    { extension: 107025, departamento_id: 23, agencias_id: 37, empleado: 'Erick Adonay Martinez Erazo' },
    { extension: 107026, departamento_id: 23, agencias_id: 37, empleado: 'Norma Esperanza Garcia Gutierrez' },
    { extension: 107041, departamento_id: 25, agencias_id: 37, empleado: 'Jorge Alfonso Pena Rosa' },
    { extension: 107042, departamento_id: 25, agencias_id: 37, empleado: 'Iris Yolanda Gomez Chinchilla' },
    { extension: 107043, departamento_id: 25, agencias_id: 37, empleado: 'Hector Alfonso Pacheco Castaneda' },
    { extension: 107071, departamento_id: 28, agencias_id: 37, empleado: 'Bianca Pamela Tosta Rosa' },
    { extension: 107111, departamento_id: 32, agencias_id: 37, empleado: 'Adolfo De Jesus Villeda Villeda' },
    { extension: 107142, departamento_id: 83, agencias_id: 37, empleado: 'Ronal Armando Soriano Aguilar' },
    { extension: 107143, departamento_id: 83, agencias_id: 37, empleado: 'No Asignado' },
    { extension: 107271, departamento_id: 41, agencias_id: 37, empleado: 'Jose Rodrigo Arevalo Vasquez' },
    { extension: 107490, departamento_id: 85, agencias_id: 37, empleado: 'Maria Marcela Alvarenga Deras' },
    { extension: 107525, departamento_id: 61, agencias_id: 37, empleado: 'Area De Seguridad' },
    { extension: 107531, departamento_id: 63, agencias_id: 37, empleado: 'No Asignado' },
    { extension: 107540, departamento_id: 66, agencias_id: 37, empleado: 'Servicios Generales' },
    { extension: 107541, departamento_id: 66, agencias_id: 37, empleado: 'No Asignado' },
    { extension: 107594, departamento_id: 76, agencias_id: 37, empleado: 'Henrry Ediberto Munguia Santos' },
    
    //Agencia 109
    { extension: 109001, departamento_id: 80, agencias_id: 2, empleado: 'Darwin Efrain Flores' },
    { extension: 109021, departamento_id: 23, agencias_id: 2, empleado: 'Karen Iveth Orellana Diaz' },
    { extension: 109022, departamento_id: 23, agencias_id: 2, empleado: 'Delmi Sarahi Mejia Roque' },
    { extension: 109012, departamento_id: 19, agencias_id: 2, empleado: 'Oscar Obed Trejo' },
    { extension: 109013, departamento_id: 19, agencias_id: 2, empleado: 'Maria Lucrecia Escobar' },
    { extension: 109015, departamento_id: 20, agencias_id: 2, empleado: 'No Asignado' },
    { extension: 109351, departamento_id: 91, agencias_id: 2, empleado: 'Josue David Amaya' },
    { extension: 109352, departamento_id: 92, agencias_id: 2, empleado: 'Luis Rodrigo Carbajal Nino' },
    { extension: 109353, departamento_id: 93, agencias_id: 2, empleado: 'Manuel Antonio Tabora Perdomo' },
    { extension: 109354, departamento_id: 93, agencias_id: 2, empleado: 'Gebia Katerine Castellanos Galdamez' },
    { extension: 109355, departamento_id: 93, agencias_id: 2, empleado: 'Willian Damian Pineda Vargas' },
    { extension: 109356, departamento_id: 93, agencias_id: 2, empleado: 'Jorge Rolando Mejia Cruz' },
    { extension: 109357, departamento_id: 93, agencias_id: 2, empleado: 'Betty Esperanza Martinez Espinoza' },
    { extension: 109358, departamento_id: 93, agencias_id: 2, empleado: 'Oralia Portillo Regalado' },
    
    //Agencia 110
    { extension: 110001, departamento_id: 80, agencias_id: 3, empleado: 'Jeidi Xiomara Lopez Flores' },
    { extension: 110012, departamento_id: 19, agencias_id: 3, empleado: 'Clementina Mejia Miranda' },
    { extension: 110015, departamento_id: 20, agencias_id: 3, empleado: 'Jorge Arturo Cardoza' },
    { extension: 110021, departamento_id: 23, agencias_id: 3, empleado: 'Herminia Yamileth Mejia Estevez' },
    { extension: 110022, departamento_id: 23, agencias_id: 3, empleado: 'Maria Isabel Soliz Soto' },
    { extension: 110023, departamento_id: 23, agencias_id: 3, empleado: 'Omar Trejo Acevedo' },
    { extension: 110041, departamento_id: 25, agencias_id: 3, empleado: 'Ricardo De Jesus Vasquez Cruz' },
    { extension: 110594, departamento_id: 76, agencias_id: 3, empleado: 'Robin Alexander Mejia Lara' },
    { extension: 110540, departamento_id: 66, agencias_id: 3, empleado: 'No Asignado' },
  
    //Agencia 112
    { extension: 11201, departamento_id: 80, agencias_id: 13, empleado: 'Cesar Arnoldo Cardona Reyes' },
    { extension: 112012, departamento_id: 19, agencias_id: 13, empleado: 'Aura Nohemi Martinez Vidal' },
    { extension: 112013, departamento_id: 19, agencias_id: 13, empleado: 'Olmer Uriel Rosales Mejia' },
    { extension: 112021, departamento_id: 23, agencias_id: 13, empleado: 'Elsa Marina Chinchilla' },
    { extension: 112022, departamento_id: 23, agencias_id: 13, empleado: 'Erika Martiza Murcia Perez' },
    { extension: 112041, departamento_id: 25, agencias_id: 13, empleado: 'Jose Luis Torres Umana' },

    // Agencia 113
    { extension: 113001, departamento_id: 80, agencias_id: 6, empleado: 'Jaime Antonio Ramos Lopez' },
    { extension: 113012, departamento_id: 19, agencias_id: 6, empleado: 'Norma Yesenia Chavez' },
    { extension: 113021, departamento_id: 23, agencias_id: 6, empleado: 'Camila Maria Leon Alvarado' },
    { extension: 113022, departamento_id: 23, agencias_id: 6, empleado: 'German Eliuth Herrera Ramos' },
    { extension: 113540, departamento_id: 54, agencias_id: 6, empleado: 'Esperanza Ramos' },
    
    // Agencia 114
    { extension: 114001, departamento_id: 80, agencias_id: 7, empleado: 'Juan Carlos Pacheco' },
  { extension: 114012, departamento_id: 19, agencias_id: 7, empleado: 'Wendy Salguero' },
  { extension: 114013, departamento_id: 19, agencias_id: 7, empleado: 'Bayron Romero' },
  { extension: 114015, departamento_id: 20, agencias_id: 7, empleado: 'Milagro Cardoza' },
  { extension: 114016, departamento_id: 20, agencias_id: 7, empleado: 'Milagro Cardoza' },
  { extension: 114021, departamento_id: 23, agencias_id: 7, empleado: 'Gilma España' },
  { extension: 114022, departamento_id: 23, agencias_id: 7, empleado: 'Leslie Mejia' },
  { extension: 114023, departamento_id: 23, agencias_id: 7, empleado: 'Minta Mayorga' },
  { extension: 114041, departamento_id: 25, agencias_id: 7, empleado: 'Rosy Monge' },
  { extension: 114042, departamento_id: 25, agencias_id: 7, empleado: 'Roger Paz' },
  { extension: 114540, departamento_id: 66, agencias_id: 7, empleado: 'No Asignado' },

  //Agencia 116
  { extension: 116001, departamento_id: 80, agencias_id: 23, empleado: 'Hector Danilo Pineda Mejia' },
  { extension: 116012, departamento_id: 19, agencias_id: 23, empleado: 'Milton Fernando Paz Vega' },
  { extension: 116015, departamento_id: 20, agencias_id: 23, empleado: 'Karen Lorena Guevara Figueroa' },
  { extension: 116021, departamento_id: 23, agencias_id: 23, empleado: 'Iris Maricela Reyes Arevalo' },
  { extension: 116022, departamento_id: 23, agencias_id: 23, empleado: 'Ana Grisela Mejia Alfaro' },
  { extension: 116540, departamento_id: 66, agencias_id: 23, empleado: 'No Asignado' },
  { extension: 116800, departamento_id: 110, agencias_id: 23, empleado: 'No Asignado' },

    //Agencia 118
    { extension: 118001, departamento_id: 80, agencias_id: 17, empleado: 'Karla Farides Peraza Leonor' },
    { extension: 118012, departamento_id: 19, agencias_id: 17, empleado: 'Ruth Nohemy Sevilla Chevez' },
    { extension: 118013, departamento_id: 19, agencias_id: 17, empleado: 'Karen Yadmin Pineda Portillo' },
    { extension: 118015, departamento_id: 20, agencias_id: 17, empleado: 'Karen Yadmin Pineda Portillo' },
    { extension: 118021, departamento_id: 23, agencias_id: 17, empleado: 'Yessenia Mercado Flores' },
    { extension: 118022, departamento_id: 23, agencias_id: 17, empleado: 'Lissa Mariela Mendez Mendoza' },
    { extension: 118041, departamento_id: 25, agencias_id: 17, empleado: 'Juan Ramon Garcia Romero' },
    { extension: 118520, departamento_id: 62, agencias_id: 17, empleado: 'Guardia de Turno' },
    
    //Agencia 121
    { extension: 121001, departamento_id: 80, agencias_id: 8, empleado: 'Gerson Flores' },
    { extension: 121012, departamento_id: 19, agencias_id: 8, empleado: 'Luis Soriano' },
    { extension: 121013, departamento_id: 19, agencias_id: 8, empleado: 'Elvin Sanchez' },
    { extension: 121021, departamento_id: 23, agencias_id: 8, empleado: 'Jeanne Rodriguez' },
    { extension: 121022, departamento_id: 23, agencias_id: 8, empleado: 'Beatris Chinchilla' },
    { extension: 121540, departamento_id: 66, agencias_id: 8, empleado: 'Ana Martinez' },
    
    //Agencia 122
    { extension: 122001, departamento_id: 80, agencias_id: 9, empleado: 'Aleida Y. Hernandez Mejia' },
  { extension: 122012, departamento_id: 19, agencias_id: 9, empleado: 'No Asignado' },
  { extension: 122013, departamento_id: 19, agencias_id: 9, empleado: 'No Asignado' },
  { extension: 122015, departamento_id: 20, agencias_id: 9, empleado: 'No Asignado' },
  { extension: 122021, departamento_id: 23, agencias_id: 9, empleado: 'No Asignado' },
  { extension: 122022, departamento_id: 23, agencias_id: 9, empleado: 'No Asignado' },
  { extension: 122250, departamento_id: 111, agencias_id: 9, empleado: 'Mariana Gavarrete' },
  { extension: 122251, departamento_id: 112, agencias_id: 9, empleado: 'Jose Anibal Dubon' },
  { extension: 122252, departamento_id: 112, agencias_id: 9, empleado: 'Daniel Perdomo' },
  { extension: 122253, departamento_id: 112, agencias_id: 9, empleado: 'Patricia Leon' },
  { extension: 122540, departamento_id: 66, agencias_id: 9, empleado: 'No Asignado' },
  { extension: 122412, departamento_id: 112, agencias_id: 9, empleado: 'Veronica Portillo' },

  //Agencia 126
  { extension: 126001, departamento_id: 80, agencias_id: 11, empleado: 'Raul Lopez Contreras' },
  { extension: 126021, departamento_id: 23, agencias_id: 11, empleado: 'Blanca Torres' },
  { extension: 126012, departamento_id: 19, agencias_id: 11, empleado: 'Alex Antonio Zaldivar Villeda' },
  { extension: 126013, departamento_id: 19, agencias_id: 11, empleado: 'Marvin Fernando Escobar' },
  { extension: 126015, departamento_id: 20, agencias_id: 11, empleado: 'Geovany De Jesus Castellanos' },
  { extension: 126540, departamento_id: 66, agencias_id: 11, empleado: 'Irma Guevara' },

  //Agencia 130
  { extension: 130001, departamento_id: 80, agencias_id: 20, empleado: 'Nelson Omar Villanueva Alvarado' },
  { extension: 130012, departamento_id: 12, agencias_id: 20, empleado: 'Arnold Modesto Benitez Portillo' },
  { extension: 130013, departamento_id: 12, agencias_id: 20, empleado: 'Denia Karina Cruz Knight' },
  { extension: 130021, departamento_id: 22, agencias_id: 20, empleado: 'Genesis Abigail Aguilar Membreño' },
  { extension: 130022, departamento_id: 22, agencias_id: 20, empleado: 'Maria Elizabeth Chinchilla Benitez' },

  //Agenca 132
  { extension: 132001, departamento_id: 80, agencias_id: 22, empleado: 'Carlos Manuel Aguilar Ventura' },
  { extension: 132012, departamento_id: 12, agencias_id: 22, empleado: 'Reinaldo Mancia' },
  { extension: 132015, departamento_id: 20, agencias_id: 22, empleado: 'Jose Yaredy Hernandez Alfaro' },
  { extension: 132021, departamento_id: 23, agencias_id: 22, empleado: 'Jackeline Vanessa Orellana Alvarado' },
  { extension: 132022, departamento_id: 23, agencias_id: 22, empleado: 'Veronica Elizabeth Serrano Mejia' },
  { extension: 132040, departamento_id: 66, agencias_id: 22, empleado: 'No Asignado' },

  //Agencia 203
  { extension: 203001, departamento_id: 80, agencias_id: 36, empleado: 'Walter Sagastume' },
  { extension: 203021, departamento_id: 23, agencias_id: 36, empleado: 'Yohanly Rivera' },
  { extension: 203141, departamento_id: 83, agencias_id: 36, empleado: 'No Asignado' },
  { extension: 203012, departamento_id: 12, agencias_id: 36, empleado: 'Cesar Izaguirre Perdomo' },

  // Agencia 209
  { extension: 209001, departamento_id: 80, agencias_id: 32, empleado: 'Erik Ronald Perdomo' },
  { extension: 209021, departamento_id: 23, agencias_id: 32, empleado: 'Lilian Yasmin Castellon' },
  { extension: 209141, departamento_id: 83, agencias_id: 32, empleado: 'Lourdes Yaneth Rodriguez' },
  { extension: 209012, departamento_id: 12, agencias_id: 32, empleado: 'Daisy Perdomo' },
  { extension: 209013, departamento_id: 12, agencias_id: 32, empleado: 'Daisy Perdomo' },
  { extension: 209015, departamento_id: 20, agencias_id: 32, empleado: 'Daisy Perdomo' },
  { extension: 209525, departamento_id: 59, agencias_id: 32, empleado: 'No Asignado' },
  { extension: 209540, departamento_id: 66, agencias_id: 32, empleado: 'No Asignado' },

  //Agencia 218
  { extension: 218001, departamento_id: 76, agencias_id: 34, empleado: 'Edin Javier Hernandez' },
  { extension: 218010, departamento_id: 12, agencias_id: 34, empleado: 'Darwin Perdomo Rivera' },
  { extension: 218012, departamento_id: 12, agencias_id: 34, empleado: 'Claudia Leiva Arriaga' },
  { extension: 218015, departamento_id: 20, agencias_id: 34, empleado: 'Boveda/ Claudia Leiva' },
  { extension: 218021, departamento_id: 23, agencias_id: 34, empleado: 'Dina Ramos Lopez' },
  { extension: 218022, departamento_id: 23, agencias_id: 34, empleado: 'Marily Toro Trochez' },
  { extension: 218023, departamento_id: 23, agencias_id: 34, empleado: 'Nubia Gomez /Estefany Garcia' },
  { extension: 218141, departamento_id: 83, agencias_id: 34, empleado: 'Victor Hugo Gonzalez' },
  { extension: 218041, departamento_id: 16, agencias_id: 34, empleado: 'Edgardo Puerto Ocampo' },
  { extension: 218042, departamento_id: 16, agencias_id: 34, empleado: 'Jose Luis Miranda' },
  { extension: 218451, departamento_id: 16, agencias_id: 34, empleado: 'Flor Enamorado Mejia' },
  { extension: 218071, departamento_id: 71, agencias_id: 34, empleado: 'Erik Lenin Paz' },
  { extension: 218072, departamento_id: 71, agencias_id: 34, empleado: 'Christian Rivera Zaldivar' },
  { extension: 218111, departamento_id: 78, agencias_id: 34, empleado: 'Hector Castellanos Rivera' },
  { extension: 218112, departamento_id: 78, agencias_id: 34, empleado: 'Amanda Bautista Pineda' },
  { extension: 218391, departamento_id: 58, agencias_id: 34, empleado: 'Keila Marissa Muñoz' },
  { extension: 218530, departamento_id: 85, agencias_id: 34, empleado: 'Sala de Juntas' },
  { extension: 218540, departamento_id: 66, agencias_id: 34, empleado: 'Cafeteria' },
  { extension: 218541, departamento_id: 87, agencias_id: 34, empleado: 'Comedor' },


  // Agencia 248
  { extension: 248012, departamento_id: 12, agencias_id: 38, empleado: 'Karen Melissa Peña' },
  { extension: 248013, departamento_id: 12, agencias_id: 38, empleado: 'Tania Castellanos Rivera' },
  { extension: 248021, departamento_id: 23, agencias_id: 38, empleado: 'Mary Aly Caballero' },
  { extension: 248022, departamento_id: 23, agencias_id: 38, empleado: 'Mery Zaldivar Sagastume' },

  // Agencia 264
  { extension: 264001, departamento_id: 1, agencias_id: 33, empleado: 'Marvin Roldan Fernandez' },
  { extension: 264012, departamento_id: 12, agencias_id: 33, empleado: 'Yajaira Castellanos Corea' },
  { extension: 264015, departamento_id: 15, agencias_id: 33, empleado: 'Yajaira Castellanos Corea' },
  { extension: 264021, departamento_id: 23, agencias_id: 33, empleado: 'Yunior Reyes Vega' },
  { extension: 264022, departamento_id: 23, agencias_id: 33, empleado: 'Darwuin Cardona Ramos' }


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

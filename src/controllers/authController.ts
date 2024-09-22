import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database/mysql';

// Regex para validar la seguridad de la contraseña
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Función para generar una contraseña aleatoria
const generatePassword = (length: number): string => {
    const charset = 'abcdefghioptvwyzABDIJKMNOPRSTVWXZ0123456789@#!$%';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};

// Función para generar un nombre de usuario único
const generarNombreUsuario = async (nombre: string): Promise<string> => {
    const sinTildes = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const baseUsername = sinTildes.replace(/\s+/g, '').toLowerCase().slice(0, 10); 
    let username = baseUsername;
    let contador = 1;

    while (true) {
        // Verificar si el nombre de usuario ya existe
        const [checkUser] = await pool.query('SELECT * FROM usuario WHERE usuario = ?', [username]);
        if (Array.isArray(checkUser) && checkUser.length === 0) {
            break; // Si no existe, se puede usar este nombre
        }
        // Si ya existe, añadir un número al final
        username = `${baseUsername}${contador}`;
        contador++;
    }
    return username;
};


export const registro = async (req: Request, res: Response): Promise<void> => {
    const { nombre, rol_id, correo } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !rol_id || !correo) {
        res.status(400).json({ error: 'Todos los campos son requeridos' });
        return;
    }

    try {
        // Verificar si ya existe un usuario con el mismo correo
        const [existingUser]: any = await pool.query('SELECT * FROM usuario WHERE correo = ?', [correo]);

        if (existingUser.length > 0) {
            res.status(400).json({ error: 'Ya existe un usuario con este correo' });
            return;
        }

        // Generar una contraseña aleatoria
        const password = generatePassword(10); // Genera una contraseña de 10 caracteres

        // Generar un nombre de usuario único
        const usuario = await generarNombreUsuario(nombre);

        // Encriptar la contraseña generada
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar el usuario en la base de datos
        await pool.query(
            'INSERT INTO usuario (nombre, usuario, contraseña, rol_id, correo) VALUES (?, ?, ?, ?, ?)',
            [nombre, usuario, hashedPassword, rol_id, correo]
        );

        // Responder con un mensaje de éxito incluyendo el usuario y la contraseña generada
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            usuario: usuario,
            contraseña: password
        });

    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { usuario, contraseña } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const [userResult] = await pool.query('SELECT * FROM usuario WHERE usuario = ?', [usuario]);

        if (Array.isArray(userResult) && userResult.length > 0) {
            const user = userResult[0] as {
                id: number;
                nombre: string;
                usuario: string;
                contraseña: string;
                rol_id: number;
            };

            // Comparar la contraseña proporcionada con la contraseña almacenada
            const isMatch = await bcrypt.compare(contraseña, user.contraseña);

            if (isMatch) {
                // Crear un token JWT
                const token = jwt.sign(
                    { id: user.id, usuario: user.usuario, rol_id: user.rol_id },
                    process.env.JWT_SECRET as string,
                    { expiresIn: '24h' }
                );

                // Devolver la respuesta con el token y los datos del usuario
                res.status(200).json({
                    token,
                    usuario: user.usuario,
                    rol_id: user.rol_id
                });
            } else {
                res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
            }
        } else {
            res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

export const cambiarContraseña = async (req: Request, res: Response): Promise<void> => {
    const { contraseñaActual, nuevaContraseña, confirmarContraseña } = req.body;
    const userId = (req as any).user?.id; // ID del usuario autenticado

    // Validar que todos los campos estén presentes
    if (!contraseñaActual || !nuevaContraseña || !confirmarContraseña) {
        res.status(400).json({ error: 'Todos los campos son requeridos: contraseña actual, nueva contraseña y confirmar contraseña' });
        return;
    }

    // Validar si las nuevas contraseñas coinciden
    if (nuevaContraseña !== confirmarContraseña) {
        res.status(400).json({ error: 'Las nuevas contraseñas no coinciden' });
        return;
    }

    // Validar que la nueva contraseña cumpla con los requisitos de seguridad
    if (!passwordRegex.test(nuevaContraseña)) {
        res.status(400).json({
            error: 'La nueva contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un símbolo (@,$,!,%,*,?,&)'
        });
        return;
    }

    try {
        // Buscar al usuario en la base de datos
        const [userResult] = await pool.query('SELECT * FROM usuario WHERE id = ?', [userId]);

        if (Array.isArray(userResult) && userResult.length > 0) {
            const user = userResult[0] as { contraseña: string };

            // Verificar si la contraseña actual coincide con la almacenada
            const isMatch = await bcrypt.compare(contraseñaActual, user.contraseña);

            if (!isMatch) {
                res.status(401).json({ error: 'La contraseña actual es incorrecta' });
                return;
            }

            // Encriptar la nueva contraseña
            const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);

            // Actualizar la nueva contraseña en la base de datos
            await pool.query('UPDATE usuario SET contraseña = ? WHERE id = ?', [hashedPassword, userId]);

            // Responder con éxito
            res.status(200).json({ mensaje: 'Contraseña actualizada exitosamente' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).json({ error: 'Error al cambiar la contraseña' });
    }
};
import { accesoToken } from '../libs/jwt.js'
import bcrypt from 'bcryptjs'
import { createUsuarios, verificarCorreo, getUsuarios } from '../models/usuarios.model.js'


export const registarUsuario = async (req, res) => {
    const { nombre, correo, contrasena } = req.body;

    try {
        const userCorreo = await verificarCorreo(correo);
        if (userCorreo) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        const userId = await createUsuarios(nombre, correo, contrasena);

        const token = await accesoToken({ id: userId });

        res.cookie("token", token);

        res.json({
            id: userId,
            correo,
            nombre,
            token
        });

    } catch (error) {
        console.error("Error en registro de usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const user = await verificarCorreo(correo);
        if (!user) {
            return res.status(400).json(['Usuario no encotrado']);
        }

        const contra = await bcrypt.compare(contrasena, user.contrasena);
        if (!contra) {
            return res.status(400).json(['Contraseña incorrecta'])
        }

        const token = await accesoToken({ id: user.id_usuario });
        res.cookie("token", token);

        res.json({
            id: user.id,
            correo: user.correo,
            nombre: user.nombre,
            token,
            tipo: user.tipo
        });

    } catch (error) {
        res.status(400).json({ message: error });
    }
};

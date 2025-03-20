import { pool } from '../config/db.js'
import bcrypt from 'bcryptjs';


export async function createUsuarios(nombre, correo, contrasena) {
    const connection = await pool.getConnection();

    try {
        const passwordHash = await bcrypt.hash(contrasena, 10);
        const [result] = await connection.execute(
            "INSERT INTO usuarios (nombre, correo, contrasena, tipo, estado) VALUES(?,?,?,?,?)",
            [nombre, correo, passwordHash, 1, 'activo']
        );
        return result.insertId;
    } finally {
        connection.release();
    }
}

export async function verificarId(userId) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(
            "SELECT * FROM usuarios WHERE id = ?", [userId]);
        return result[0];
    } finally {
        connection.release();
    }
}

export async function verificarCorreo(correo) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(
            "SELECT * FROM usuarios WHERE correo = ?", [correo]);
        return result[0];
    } finally {
        connection.release();
    }
}

export const getUsuarios = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query("SELECT * FROM usuarios");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    } finally {
        connection.release();
    }
};

export const getUsersId = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        // Verifica los parámetros que llegan en la solicitud
        console.log("Parametros recibidos:", req.params);  // Esto imprimirá los params completos

        const { id } = req.params; // se obtiene el id desde la URL
        console.log("ID recibido:", id);  // Esto imprimirá solo el id

        const [rows] = await connection.query("SELECT * FROM usuarios WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" }); // Quiere decir que no se encontró en la bd
        }
        res.status(200).json(rows[0]); // Si se encontró, se envía un status 200 de que sí lo encontró
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    } finally {
        connection.release();
    }
};


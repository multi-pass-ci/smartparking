import { Router } from "express";
import { OAuth2Client } from "google-auth-library"; // Importar Google OAuth2Client
import jwt from "jsonwebtoken"; // Importar jsonwebtoken
import { validateMid } from "../middlewares/validarMiddleware.js";
import { registarUsuario, loginUsuario, logout, profile, registarUsuarioCRUD } from "../controllers/usuarios.controller.js";
import { loginSchema, registroSchema, updateSchema } from "../schemas/usuarios.schemas.js";
import { getUsuarios, getUsersId, deleteUserById, updateUserById, crearUsuarioGoogle, updateUserByIdCRUD, verificarCorreo } from "../models/usuarios.model.js"; // Importar las nuevas funciones
import { authToken } from "../middlewares/validarToken.js";


const router = Router();

// Rutas para login tradicional
router.post('/usuarios/registro', validateMid(registroSchema), registarUsuario);
router.post('/usuarios/login', validateMid(loginSchema), loginUsuario);
router.post('/logout', logout); // Cerrar sesión eliminando token de cookies
router.get('/usuarios/perfil', authToken, profile); // Protección de ruta con authToken validando el token existente

// CRUD usuarios
router.get('/usuarios/', authToken, getUsuarios);
router.get('/usuarios/:id', authToken, getUsersId);
router.post('/usuarios/', registarUsuarioCRUD);
router.patch('/usuarios/update/:id', authToken, updateUserById); //para editar en móvil campo nombre y correo
router.patch('/usuarios/:id', authToken, validateMid(updateSchema), updateUserByIdCRUD); //para editar en web más campos
router.delete('/usuarios/:id', authToken, deleteUserById);

// Configurar el cliente de Google OAuth
const client = new OAuth2Client("502548877339-iau4hvt7nlhm3p9d31q33960q1c10524.apps.googleusercontent.com");

// Ruta para autenticación con Google
router.post("/auth/google", async (req, res) => {
    const { token } = req.body;

    try {
        // Verificar el token de Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "502548877339-iau4hvt7nlhm3p9d31q33960q1c10524.apps.googleusercontent.com",
        });

        const payload = ticket.getPayload();
        const { email, name } = payload;

        // Validar si el usuario ya existe en la base de datos
        let usuario = await verificarCorreo(email);

        // Si el usuario no existe, créalo
        if (!usuario) {
            const userId = await crearUsuarioGoogle({ email, name });
            usuario = await verificarCorreo(email); // Obtén el usuario recién creado
        }

        // Generar un token JWT para tu aplicación
        const userToken = jwt.sign({ id: usuario.id, email, name }, "tokenrandom", { expiresIn: "1h" });

        // Enviar el token JWT al frontend
        res.json({ token: userToken });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la autenticación con Google");
    }
});

// CRUD usuarios
router.get('/registros/');
// router.get('/usuarios/:id', authToken, getUsersId);
// router.post('/usuarios/', registarUsuarioCRUD);
// router.patch('/usuarios/update/:id', authToken, updateUserById); //para editar en móvil campo nombre y correo
// router.patch('/usuarios/:id', authToken, validateMid(updateSchema), updateUserByIdCRUD); //para editar en web más campos
// router.delete('/usuarios/:id', authToken, deleteUserById);

export default router;
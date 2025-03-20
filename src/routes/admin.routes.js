import { Router } from "express";
import { validateMid } from "../middlewares/validarMiddleware.js";
import { registarUsuario, loginUsuario, logout, profile} from "../controllers/usuarios.controller.js";
import { loginSchema, registroSchema } from "../schemas/usuarios.schemas.js";
import { getUsuarios, getUsersId } from "../models/usuarios.model.js";
import { authToken } from "../middlewares/validarToken.js";

const router = Router();

//rutas para login
router.post('/usuarios/registro', validateMid(registroSchema), registarUsuario);
router.post('/usuarios/login', validateMid(loginSchema), loginUsuario);
router.post('/logout', logout); //cerrar sesión eliminando token de cookies
router.get('/usuarios/perfil', authToken, profile) //protección de ruta con authToken validando el token existente

//CRUD usuarios
router.get('/usuarios/', authToken, getUsuarios);
router.get('/usuarios/:id', authToken, getUsersId);
router.post('/usuarios/:id', authToken, getUsersId);
router.put('/usuarios/:id', authToken, getUsersId);
router.delete('/usuarios/:id', authToken, getUsersId);


export default router;
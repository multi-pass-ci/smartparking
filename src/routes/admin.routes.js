import { Router } from "express";
import { validateMid } from "../middlewares/validarMiddleware.js";
import { registarUsuario, loginUsuario} from "../controllers/usuarios.controller.js";
import { loginSchema, registroSchema } from "../schemas/usuarios.schemas.js";
import { getUsuarios, getUsersId } from "../models/usuarios.model.js";

const router = Router();

router.post('/usuarios/registro', validateMid(registroSchema), registarUsuario);
router.post('/usuarios/login', validateMid(loginSchema), loginUsuario);
router.get('/usuarios/', getUsuarios);
router.get('/usuarios/:id', getUsersId);

export default router;
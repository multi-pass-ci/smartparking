import express, { application } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import adminRoutes from '../routes/admin.routes.js'

//iniciando el servidor
const app = express();

//middleware para convertir los req body para que el backend entienda con express los json
app.use(express.json())
app.use(cors())
app.use(cookieParser()) //manejo de cookies

app.use("/parking", adminRoutes) //ruta principal de las apis

export default app;
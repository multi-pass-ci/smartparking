import express, { application } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import adminRoutes from '../routes/admin.routes.js'

const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/parking", adminRoutes)

export default app;
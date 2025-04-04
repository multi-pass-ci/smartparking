import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import adminRoutes from '../routes/admin.routes.js';
import iotRoutes from '../routes/iot.routes.js';


// Iniciando el servidor
const app = express();

// Middleware para convertir los req body para que el backend entienda con express los json
app.use(express.json());

// Configuración de CORS
app.use(
    cors({
        origin: [
            'http://localhost:5173', 
            'http://localhost:8081',
            'https://smartparking-eight.vercel.app',
            'https://smartparking-ten.vercel.app'
            ],
        credentials: true,
    })
);

app.use(cookieParser()); // Manejo de cookies

// Ruta principal de las APIs
app.use('/parking', adminRoutes);
app.use('/api/iot', iotRoutes);

export default app;
import app from './config/app.js'
import { PORT } from './config/config.js'
import './config/db.js';

app.listen(PORT)
console.log('Corriendo en el puerto', PORT);
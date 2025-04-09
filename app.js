const express = require('express');
const cors = require('cors');
const eventoRoutes = require('./src/routes/evento.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/eventos', eventoRoutes);

module.exports = app;

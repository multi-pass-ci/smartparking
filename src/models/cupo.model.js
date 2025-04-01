import mongoose from 'mongoose';

const cupoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  tipo: {
    type: String,
    enum: ['entrada', 'salida'],
    required: true,
  },
  pluma: {
    type: String,
    enum: ['entrada', 'salida'],
    required: true,
  },
  sensorIR: {
    type: Boolean,
    required: true,
  }
});

export default mongoose.model('Cupo', cupoSchema, 'cupos');

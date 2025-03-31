import mongoose from 'mongoose';

const cajonSchema = new mongoose.Schema({
  numeroCajon: Number,
  ocupado: Boolean,
  fechaEntrada: Date,
  fechaSalida: Date
});

const Cajon = mongoose.model('Cajon', cajonSchema);
export default Cajon;

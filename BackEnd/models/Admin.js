import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  correo: {type: String, required: [true, 'Correo obligatorio']},
  contrasena: String,
});

// Convertir a modelo
const Nota = mongoose.model('Admin', notaSchema);
export default Nota;
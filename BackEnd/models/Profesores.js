import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  nombre: {type: String, required: [true, 'Nombre obligatorio']},
  correo: String,
  tipo: String,
  contrasena: String,
});

// Convertir a modelo
const Nota = mongoose.model('Profesores', notaSchema);
export default Nota;
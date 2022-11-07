import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  nombre: {type: String, required: [true, 'Nombre obligatorio']},
  matricula: {type: String, required: [true, 'Matricula obligatorio']},
  correo: String,
  tipo: String,
  contrasena: String,
});

// Convertir a modelo
const Nota = mongoose.model('Alumnos', notaSchema);
export default Nota;
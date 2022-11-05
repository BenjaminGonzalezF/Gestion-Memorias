import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  nombre: {type: String, required: [true, 'Nombre obligatorio']},
  correo: String,
  contrasena: String,
});

// Convertir a modelo
const Nota = mongoose.model('Comite', notaSchema);
export default Nota;
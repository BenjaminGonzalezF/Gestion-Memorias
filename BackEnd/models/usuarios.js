import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  nombre:String,
  matricula:String,
  correo:{type: String, required: [true, 'CORREO USUARIO obligatorio']},
  contrasena: {type: String, required: [true, 'NOMBRE USUARIO obligatorio']},
  trabaja: Boolean,
  modulosfaltantes: Array,
  esprofe: Boolean,
  esalumno:Boolean,
  escomite:Boolean,
  esdirector:Boolean,
  rolActivo:String,
  img:String,
});

// Convertir a modelo
const Nota = mongoose.model('usuarios', notaSchema);
export default Nota;
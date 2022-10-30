import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  idCreador:{type: String, required: [true, 'idCreador obligatorio']},
  nombre:String,
  estado:Boolean,
  requisitos:String,
  descripcion:String
});

// Convertir a modelo
const Nota = mongoose.model('Tema', notaSchema);
export default Nota;
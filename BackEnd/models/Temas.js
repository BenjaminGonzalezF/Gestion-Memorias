import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  idCreador:{type: Schema.Types.ObjectId, ref: 'Escuela'},
  idCreador:{type: Schema.Types.ObjectId, ref: 'Alumnos'},
  nombre:String,
  estado:Boolean,
  requisitos:Array,
  descripcion:String
});

// Convertir a modelo
const Nota = mongoose.model('Temas', notaSchema);
export default Nota;
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  id_ref:{type: Schema.Types.ObjectId, ref: 'usuarios'},
  visto:Boolean,
  notificacion:String,
});

// Convertir a modelo
const Nota = mongoose.model('notificaciones', notaSchema);
export default Nota;
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  idCreador:{type: Schema.Types.ObjectId, ref: 'usuarios'},
  nombre:String,
  estado:Boolean,
  requisitos:Array,
  descripcion:String,
  votos:[{
    refcomite:String,
    voto:Boolean
  }],
  resultado_comite:Boolean,
  resultado_directora:Boolean,
  resultado_profesor:Boolean,
});

// Convertir a modelo
const Nota = mongoose.model('temas', notaSchema);
export default Nota;
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  profeguiaid:{type: Schema.Types.ObjectId, ref: 'usuarios'},
  alumnoid:{type: Schema.Types.ObjectId, ref: 'usuarios'},
  temaid:{type: Schema.Types.ObjectId, ref: 'usuarios'},
  estado: Boolean,
  razon: String,
});

// Convertir a modelo
const Nota = mongoose.model('solicitudes', notaSchema);
export default Nota;
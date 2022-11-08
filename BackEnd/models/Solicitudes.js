import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  profeguiaid:{type: Schema.Types.ObjectId, ref: 'Profesores'},
  alumnoid:{type: Schema.Types.ObjectId, ref: 'Alumnos'},
  temaid:{type: Schema.Types.ObjectId, ref: 'Temas'},
  estado: Boolean,
  razon: String,
});

// Convertir a modelo
const Nota = mongoose.model('Solicitudes', notaSchema);
export default Nota;
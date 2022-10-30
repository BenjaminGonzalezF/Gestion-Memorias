import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  profeGuia:{type: Schema.Types.ObjectId, ref: 'Funcionario'},
  alumno:{type: Schema.Types.ObjectId, ref: 'Alumno'},
  tema:{type: Schema.Types.ObjectId, ref: 'Tema'},
  estado: Boolean,
  razon: String,
});

// Convertir a modelo
const Nota = mongoose.model('Solicitud', notaSchema);
export default Nota;
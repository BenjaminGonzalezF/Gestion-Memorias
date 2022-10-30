import express from 'express';
const router = express.Router();

// importar el modelo nota
import Funcionario from '../models/Funcionario';

// Agregar una nota
router.post('/nuevo_funcionario', async(req, res) => {
  const body = req.body;  
  try {
    const notaDB = await Funcionario.create(body);
    res.status(200).json(notaDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con parámetros
router.get('/funcionario/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const notaDB = await Funcionario.findOne({_id});
    res.json(notaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con todos los documentos
router.get('/todos_funcionarios', async(req, res) => {
  try {
    const notaDb = await Funcionario.find();
    res.json(notaDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Delete eliminar una nota
router.delete('/funcionario_el/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const notaDb = await Funcionario.findByIdAndDelete({_id});
    if(!notaDb){
      return res.status(400).json({
        mensaje: 'No se encontró el id indicado',
        error
      })
    }
    res.json(notaDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Put actualizar una nota
router.put('/funcionario_ac/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const notaDb = await Funcionario.findByIdAndUpdate(
      _id,
      body,
      {new: true});
    res.json(notaDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Exportación de router
module.exports = router;
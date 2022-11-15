import express from 'express';
const router = express.Router();

// importar el modelo nota
import Tema from '../models/temas';

// Agregar una nota
router.post('/nuevo_tema', async(req, res) => {
  const body = req.body;  
  try {
    const notaDB = await Tema.create(body);
    res.status(200).json(notaDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con parámetros
router.get('/tema/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const notaDB = await Tema.findOne({_id});
    res.json(notaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});
router.get('/tema_creador/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const notaDB = await Tema.find();
    const filter = notaDB.filter(v => v.idCreador==_id)
    res.json(filter);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});


// Get con todos los documentos
router.get('/todos_temas', async(req, res) => {
  try {
    const notaDb = await Tema.find();
    res.json(notaDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Delete eliminar una nota
router.delete('/tema_el/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const notaDb = await Tema.findByIdAndDelete({_id});
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
router.put('/tema_ac/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const notaDb = await Tema.findByIdAndUpdate(
      _id,
      body,
      {new: true});
    console.log("tema actualizado")
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
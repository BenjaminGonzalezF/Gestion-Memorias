import express from 'express';
const router = express.Router();

// importar el modelo nota
import Notificacion from '../models/Notificaciones';

// Agregar una nota
router.post('/nuevo_notificacion', async(req, res) => {
  const body = req.body;  
  try {
    const notaDB = await Notificacion.create(body);
    res.status(200).json(notaDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con todos los documentos
router.get('/todos_notificaciones', async(req, res) => {
  try {
    const notaDB = await Notificacion.find();
    res.json(notaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Put actualizar una nota
router.put('/notificacion_ac/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const notaDb = await Notificacion.findByIdAndUpdate(
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
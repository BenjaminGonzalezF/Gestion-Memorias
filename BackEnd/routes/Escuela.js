import express from 'express';
const router = express.Router();

// importar el modelo nota
import Escuela from '../models/Escuela';

// Get con todos los documentos
router.get('/todos_escuela', async(req, res) => {
  try {
    const notaDb = await Escuela.find();
    res.json(notaDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Agregar una nota
router.post('/nuevo_escuela', async(req, res) => {
  const body = req.body;  
  try {
    const notaDB = await Escuela.create(body);
    res.status(200).json(notaDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});


// Exportación de router
module.exports = router;
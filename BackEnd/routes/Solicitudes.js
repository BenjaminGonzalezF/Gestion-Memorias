import express from 'express';
const router = express.Router();

// importar el modelo nota
import Solicitud from '../models/solicitudes';

// Agregar una nota
router.post('/nuevo_solicitud', async(req, res) => {
  const body = req.body;  
  try {
    const notaDB = await Solicitud.create(body);
    res.status(200).json(notaDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con todos los documentos
router.get('/todos_solicitudes', async(req, res) => {
  try {
    const notaDB = await Solicitud.find();
    res.json(notaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con parámetros
router.get('/solicitud_profesor/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const notaDB = await Solicitud.find();
    const filtro = notaDB.filter(v => v.profeguiaid ==_id);
    res.json(filtro);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.get('/solicitud_alumno/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const notaDB = await Solicitud.find();
    const filtro = notaDB.filter(v => v.alumnoid ==_id);
    res.json(filtro);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});


router.get('/solicitud_tema/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const notaDB = await Solicitud.find();
    const filtro = notaDB.filter(v => v.temaid ==_id);
    res.json(filtro);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Put actualizar una nota
router.put('/solicitud_ac/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const notaDb = await Solicitud.findByIdAndUpdate(
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
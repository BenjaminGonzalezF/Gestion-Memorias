import express from 'express';
const router = express.Router();

// importar el modelo nota
import Admin from '../models/Admin';

// Get con parámetros
router.get('/alumno/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const notaDB = await Admin.findOne({_id});
    res.json(notaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Exportación de router
module.exports = router;
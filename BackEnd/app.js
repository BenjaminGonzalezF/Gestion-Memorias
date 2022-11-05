import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

const app = express();

//Conexion DB Local
/* const uri = 'mongodb://localhost:27017/myapp'; */
//hola
//Conexion DB nubr
const uri = 'mongodb+srv://CS222:DF4SQd50dElND5Ir@cluster.hvfa1qy.mongodb.net/cs222';
const options = {useNewUrlParser: true};
// Or using promises
mongoose.connect(uri, options).then(
  () => { console.log('Conectado a DB') },
  err => { console.log(err) }
);

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/Alumnos'));
app.use('/api', require('./routes/Profesores'));
app.use('/api', require('./routes/Solicitudes'));
app.use('/api', require('./routes/Temas'));
app.use('/api', require('./routes/Comite'));
app.use('/api', require('./routes/Escuela'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port'+ app.get('puerto'));
});


require('dotenv').config(); // Carga variables del .env

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas (carpeta correcta es 'routes', no 'routers')
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

// Conectar a MongoDB y luego iniciar servidor
console.log('Mongo URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(3000, () => {
      console.log('API escuchando en puerto 3000');
    });
  })
  .catch(err => {
    console.error('Error en conexión a MongoDB:', err);
  });

// Endpoint raíz para prueba
app.get('/', (req, res) => res.send('API funcionando'));

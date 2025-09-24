const express = require('express');
const router = express.Router();
const Task = require('../modelos/Task'); // Importa tu modelo

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo tareas' });
  }
});

module.exports = router;

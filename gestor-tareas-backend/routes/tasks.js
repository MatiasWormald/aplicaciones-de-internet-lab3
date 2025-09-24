const express = require('express');
const router = express.Router();
const Task = require('../modelos/Task');

// Obtener tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo tareas' });
  }
});

// Crear nueva tarea
router.post('/', async (req, res) => {
  try {
    const { title, status, priority } = req.body;
    // userId se puede agregar fijo, o mejorar el modelo luego
    const nuevaTarea = new Task({
      title,
      status,
      priority,
      userId: '64fa1ca5f2b34434b8c9a123', // puedes reemplazar con un id real
    });
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear tarea', error: err.message });
  }
});

module.exports = router;

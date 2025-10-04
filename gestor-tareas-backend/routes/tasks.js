const express = require('express');
const router = express.Router();
const Task = require('../modelos/Task');

// Obtener tareas por usuario
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo tareas' });
  }
});

// Crear nueva tarea
router.post('/', async (req, res) => {
  try {
    const { title, status, userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'Falta userId' });
    const nuevaTarea = new Task({ title, status, userId });
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear tarea', error: err.message });
  }
});

module.exports = router;

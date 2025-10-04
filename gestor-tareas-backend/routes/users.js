const express = require('express');
const router = express.Router();
const User = require('../modelos/User');

// Registro
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email ya registrado' });
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ userId: user._id, email: user.email });
  } catch (err) {
    res.status(400).json({ message: 'Error en registro', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: 'Credenciales incorrectas' });
    res.json({ userId: user._id, email: user.email });
  } catch (err) {
    res.status(400).json({ message: 'Error en login', error: err.message });
  }
});

module.exports = router;

const db = require('../config/database');

module.exports = (req, res) => {
  const { nombre, email, telefono, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'El nombre, el email y la contraseña son obligatorios' });
  }

  const query = 'INSERT INTO usuarios (nombre, email, telefono, password) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, email, telefono, password], (err, result) => {
    if (err) {
      console.error('Error al crear usuario:', err);
      return res.status(500).json({
        error: 'Error al crear usuario',
        details: err.message
      });
    }

    res.status(201).json({
      id: result.insertId,
      nombre,
      email,
      telefono,
      password,
      message: 'Usuario creado correctamente'
    });
  });
};

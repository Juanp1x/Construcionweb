const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 🟢 READ - Listar todos los usuarios
router.get('/', (req, res) => {
  const query = 'SELECT * FROM usuarios ORDER BY id DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({
        error: 'Error al obtener usuarios',
        details: err.message,
      });
    }
    res.json(results);
  });
});

//  READ - Obtener un usuario por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM usuarios WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener el usuario:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(results[0]);
  });
});

// 🟢 CREATE - Agregar un nuevo usuario
router.post('/', (req, res) => {
  const { nombre, email, telefono } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: 'El nombre y el email son obligatorios' });
  }

  const query = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
  db.query(query, [nombre, email, telefono], (err, result) => {
    if (err) {
      console.error('Error al crear usuario:', err);
      return res.status(500).json({ error: 'Error al crear usuario', details: err.message });
    }
    res.status(201).json({
      id: result.insertId,
      nombre,
      email,
      telefono,
      message: 'Usuario creado correctamente',
    });
  });
});

//  UPDATE - Editar un usuario existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;
  const query = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?';

  db.query(query, [nombre, email, telefono, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar usuario' });
    }
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

//  DELETE - Eliminar un usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar usuario:', err);
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;

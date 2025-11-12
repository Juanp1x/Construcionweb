const db = require('../config/database');

module.exports = (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, password } = req.body;

  const query = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ?, password = ? WHERE id = ?';
  db.query(query, [nombre, email, telefono, password, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).json({
        error: 'Error al actualizar usuario',
        details: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado correctamente' });
  });
};

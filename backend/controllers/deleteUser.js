const db = require('../config/database');

module.exports = (req, res) => {
 const { id } = req.params;
 const query = 'DELETE FROM usuarios WHERE id = ?';
 db.query(query, [id], (err, result) => {
   if (err) {
     console.error('Error al eliminar usuario:', err);
     return res.status(500).json({
       error: 'Error al eliminar usuario',
       details: err.message
     });
   }
   if (result.affectedRows === 0) {
     return res.status(404).json({ message: 'Usuario no encontrado' });
   }
   res.json({ message: 'Usuario eliminado correctamente' });
 });
};

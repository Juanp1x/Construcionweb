const db = require('../config/database');

module.exports = (req, res) => {
 const { id } = req.params;
 const query = 'SELECT * FROM usuarios WHERE id = ?';
 db.query(query, [id], (err, results) => {
   if (err) {
     console.error('Error al obtener usuario:', err);
     return res.status(500).json({
       error: 'Error al obtener usuario',
       details: err.message
     });
   }
   if (results.length === 0) {
     return res.status(404).json({ message: 'Usuario no encontrado' });
   }
   res.json(results[0]);
 });
};

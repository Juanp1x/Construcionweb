const db = require('../config/database');

module.exports = (req, res) => {
 const query = 'SELECT * FROM usuarios ORDER BY id DESC';
 db.query(query, (err, results) => {
   if (err) {
     console.error('Error al obtener usuarios:', err);
     return res.status(500).json({
       error: 'Error al obtener usuarios',
       details: err.message
     });
   }
   res.json(results);
 });
};
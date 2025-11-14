const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Importar controladores
const readUsers = require('../controllers/readUser');
const readUserById = require('../controllers/readUserById');
const createUser = require('../controllers/createUser');
const updateUser = require('../controllers/updateUser');
const deleteUser = require('../controllers/deleteUser');

// Rutas CRUD
router.get('/', readUsers);
router.get('/:id', readUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


// LOGIN BÁSICO SIN TOKENS

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log("Datos recibidos en login:", req.body);

    if (!email || !password) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error en login:', err);
            return res.status(500).json({ error: 'Error interno' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        res.json({
            message: 'Login exitoso',
            user: results[0]
        });
    });
});

module.exports = router;

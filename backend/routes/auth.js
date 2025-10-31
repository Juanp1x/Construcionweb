const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcryptjs');

// Ruta para login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email y contraseña son requeridos'
        });
    }

    // Buscar usuario por email
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error en consulta:', err);
            return res.status(500).json({
                success: false,
                message: 'Error del servidor'
            });
        }

        // Verificar si el usuario existe
        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        const user = results[0];

        // Verificar contraseña (en producción usar bcrypt.compare)
        // Por ahora comparación simple para desarrollo
        if (password === user.password) {
            // Login exitoso
            res.json({
                success: true,
                message: 'Login exitoso',
                user: {
                    id: user.id,
                    nombre: user.nombre,
                    email: user.email
                }
            });
        } else {
            // Contraseña incorrecta
            res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }
    });
});

// Ruta para verificar sesión
router.get('/verify', (req, res) => {
    // En una implementación real, verificarías un token JWT
    res.json({ message: 'Ruta de verificación' });
});

module.exports = router;
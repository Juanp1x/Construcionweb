const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
const PORT = 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/auth', authRoutes);        // 👉 para login y autenticación
app.use('/api/usuarios', usuariosRoutes); // 👉 para operaciones de usuarios

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente 🚀' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

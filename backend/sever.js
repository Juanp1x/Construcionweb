const express = require('express');
const cors = require('cors');
// 👇 QUITAR esta línea
// const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
const PORT = 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas principales
// 👇 QUITAR esta línea
// app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes); // 👈 Esta ruta ahora tiene el login

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente 🚀' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
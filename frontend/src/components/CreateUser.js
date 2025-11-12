import React, { useState } from 'react';
import axios from 'axios';
import './Styles/createUser.css';

function CreateUser() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/usuarios', { nombre, email, telefono, password })
      .then(() => {
        setMensaje('✅ Usuario creado correctamente');
        setNombre('');
        setEmail('');
        setTelefono('');
        setPassword('');
        setTimeout(() => setMensaje(''), 2500);
      })
      .catch(() => setMensaje('❌ Error al crear usuario'));
  };

  return (
    <div className="create-container">
      <h2>Crear Usuario</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="create-button" type="submit">Guardar</button>
      </form>
      {mensaje && <p className="create-message">{mensaje}</p>}
    </div>
  );
}

export default CreateUser;

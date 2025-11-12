import React, { useState } from 'react';
import axios from 'axios';
import './Styles/updateUser.css';

function UpdateUser() {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5001/api/usuarios/${id}`, { nombre, email, telefono, password })
      .then(() => {
        setMensaje('✅ Usuario actualizado correctamente');
        setId('');
        setNombre('');
        setEmail('');
        setTelefono('');
        setPassword('');
        setTimeout(() => setMensaje(''), 2500);
      })
      .catch(() => setMensaje('❌ Error al actualizar usuario'));
  };

  return (
    <div className="update-container">
      <h2>Actualizar Usuario</h2>
      <form className="update-form" onSubmit={handleUpdate}>
        <input type="text" placeholder="ID del usuario" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="text" placeholder="Nuevo nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="email" placeholder="Nuevo email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Nuevo teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <input type="password" placeholder="Nueva contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="update-button" type="submit">Actualizar</button>
      </form>
      {mensaje && <p className="update-message">{mensaje}</p>}
    </div>
  );
}

export default UpdateUser;

import React, { useState } from 'react';
import axios from 'axios';
import './Styles/deleteUser.css';

function DeleteUser() {
  const [id, setId] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5001/api/usuarios/${id}`)
      .then(() => {
        setMensaje('✅ Usuario eliminado correctamente');
        setId('');
        setTimeout(() => setMensaje(''), 2500);
      })
      .catch(() => setMensaje('❌ Error al eliminar usuario'));
  };

  return (
    <div className="delete-container">
      <h2>Eliminar Usuario</h2>
      <form className="delete-form" onSubmit={handleDelete}>
        <input
          type="text"
          placeholder="ID del usuario a eliminar"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="delete-button" type="submit">
          Eliminar
        </button>
      </form>
      {mensaje && <p className="delete-message">{mensaje}</p>}
    </div>
  );
}

export default DeleteUser;

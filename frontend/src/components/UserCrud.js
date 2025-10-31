import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserCrud.css";

const API_URL = "http://localhost:5001/api/usuarios";

function UserCrud() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ nombre: "", email: "", telefono: "" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono,
    });
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar este usuario?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="crud-container">
      <h2 className="crud-title">💄 Gestión de Clientes - Beauty Glam 💅</h2>

      <form className="crud-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
        />
        <button type="submit" className="crud-btn add-btn">
          {editId ? "Actualizar ✨" : "Agregar 💕"}
        </button>
      </form>

      <table className="crud-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo electrónico</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.telefono}</td>
              <td>
                <button className="crud-btn edit-btn" onClick={() => handleEdit(u)}>
                  Editar
                </button>
                <button
                  className="crud-btn delete-btn"
                  onClick={() => handleDelete(u.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserCrud;

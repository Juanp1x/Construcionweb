import { useState, useEffect } from "react";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import ReadUsers from "./components/UserList";
import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Bienvenido {user.nombre}</h1>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem('user');
            window.location.reload();
          }}
        >
          Cerrar Sesión
        </button>
      </header>

      <main className="crud-container">
        <h2>Gestión de Usuarios</h2>
        <div className="crud-grid">
          <CreateUser />
          <ReadUsers />
          <UpdateUser />
          <DeleteUser />
        </div>
      </main>
    </div>
  );
}

export default App;

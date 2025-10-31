import { useState } from "react";
import Login from "./components/Login";
import UserCrud from "./components/UserCrud"; // Cambiar por UserCrud

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd'
      }}>
        <h1>Bienvenido {user.nombre}</h1>
        <button 
          onClick={() => {
            localStorage.removeItem('user');
            window.location.reload();
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
      </div>
      <UserCrud />
    </div>
  );
}

export default App;
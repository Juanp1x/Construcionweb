import React, { useState } from 'react';
import axios from 'axios';
import './Styles/Login.css';

function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // RUTA CORRECTA SEGÚN TU BACKEND
            const response = await axios.post(
                'http://localhost:5001/api/usuarios/login',
                formData
            );

            // AJUSTE: Tu backend NO manda "success", solo "message"
            if (response.data.message === 'Login exitoso') {
                onLogin(response.data.user);
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Iniciar Sesión</h2>
                    <p>Bienvenido a Beauty Glam✨</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

            </div>
        </div>
    );
}

export default Login;

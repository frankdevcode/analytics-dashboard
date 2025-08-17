import { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/auth/login', credentials);
      const { access_token } = response.data;
      onLogin(access_token);
    } catch (err) {
      console.error('Error de login:', err.response?.data || err.message);
      setError('Credenciales inválidas. Usa las credenciales de demo: demo/demo123');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');
    
    const demoCredentials = {
      username: 'demo',
      password: 'demo123'
    };

    try {
      const response = await axios.post('http://localhost:8000/auth/login', demoCredentials);
      const { access_token } = response.data;
      onLogin(access_token);
    } catch (err) {
      console.error('Error de login demo:', err.response?.data || err.message);
      setError('Error al conectar con el servidor. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Analytics Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inicia sesión para acceder al dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Ingresa tu usuario"
                value={credentials.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Ingresa tu contraseña"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">o</span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Accediendo...' : '🚀 Login como Demo'}
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-blue-800 mb-2">💡 Credenciales de Demo</h3>
              <p className="text-xs text-blue-600 mb-2">Este es un proyecto de portafolio con datos ficticios</p>
              <div className="space-y-1 text-sm">
                <p>Usuario: <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">demo</span></p>
                <p>Contraseña: <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">demo123</span></p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
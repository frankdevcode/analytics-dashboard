import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Layout from './components/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token guardado
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? 
                <Login onLogin={handleLogin} /> : 
                <Navigate to="/dashboard" replace />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
                <Layout onLogout={handleLogout}>
                  <Dashboard />
                </Layout> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/reports" 
            element={
              isAuthenticated ? 
                <Layout onLogout={handleLogout}>
                  <Reports />
                </Layout> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

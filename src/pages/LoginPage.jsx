import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const LoginPage = () => {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const navigate = useNavigate();
  const logged = useSelector((state) => state.account.logged);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const googleAuth = API_BASE + "/login-google"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/login-inner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Handle successful login, maybe redirect or update state
        console.log('Login successful');
        navigate('/');
      } else {
        // Handle login failure
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  useEffect(() => {
    if (logged) {
      return navigate('/');
    }
  }, [logged, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text-primary p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-surface rounded-2xl shadow-2xl backdrop-blur-sm bg-opacity-50 border border-border">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-primary">Bienvenido a Questoria</h1>
          <p className="mt-2 text-text-secondary">Ingresa tus datos para comenzar tu aventura</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 text-white bg-transparent border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 text-white bg-transparent border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
              required
            />
          </div>
          <button type="submit" className="w-full p-4 font-bold text-white rounded-lg bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300 shadow-lg">
            Iniciar sesión
          </button>
        </form>
        <div className="flex items-center justify-center space-x-2">
          <hr className="w-full border-border" />
          <p className="px-2 text-text-secondary whitespace-nowrap">o</p>
          <hr className="w-full border-border" />
        </div>
        <a href={googleAuth} className="flex items-center justify-center w-full p-4 space-x-3 text-lg font-medium text-text-primary bg-transparent border-2 border-border rounded-lg hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 shadow-lg">
          <FontAwesomeIcon icon={faGoogle} />
          <span>Iniciar sesión con Google</span>
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
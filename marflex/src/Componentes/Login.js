import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/LogoMarflex.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './styles/Login.css'; // Archivo CSS para estilos específicos de Login
import axios from 'axios';



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', { username, password });
      localStorage.setItem('token', response.data.token);
      alert('Login exitoso');
      navigate('/HomeAdmin');
    } catch (error) {
      console.error('Login failed', error);
      alert('Usuario o contraseña incorrectos');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} method="post">
        <div className="img-presentacion">
          <img src="img/persona-que-relaja-casa.png" alt="imagen de presentación" />
        </div>
        <div className="formulario">
          <div className="titulo-login">
            <img src={logo} alt="Logo de la empresa" />
            <h1>LOGIN</h1>
          </div>
          <div className="content-input">
            <span className='span'>
              <FontAwesomeIcon icon={faUsers} size="xl" style={{ color: "#646973" }} />
              <input
                type="email"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </span>
            <span className="span password-container">
              <img className="icon" src="/img/password.png" alt="icono de password" />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                className="visibility_off"
                src={passwordVisible ? "/img/visibility.png" : "/img/visibility_off.png"}
                alt="icono del ojo"
                onClick={togglePasswordVisibility}
              />
            </span>
            <span className='span'>
              <button className="btn" type="submit">Iniciar Sesión</button>
            </span>
            <span className='span'>
              <a href="https://google.com">¿Has olvidado tu contraseña?</a>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
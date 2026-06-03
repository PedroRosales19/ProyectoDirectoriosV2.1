import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login: authLogin } = useContext(AuthContext);

  const navigate = useNavigate();



  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

authLogin(res.data.token);

      navigate("/dashboard");
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-title">
          ContactosPro
        </h1>

        <form onSubmit={login}>

          <input
            className="auth-input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            className="btn-primary"
            type="submit"
          >
            Ingresar
          </button>

        </form>

        <p className="auth-text">
          ¿No tienes cuenta?
        </p>

        <Link to="/register">
          <button className="btn-secondary">
            Registrarse
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Login;
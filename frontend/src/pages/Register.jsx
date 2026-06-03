import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";

import "../styles/Auth.css";

function Register() {
  const [nombre, setNombre] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    if (
      !nombre ||
      !email ||
      !password
    ) {
      toast.error(
        "Completa todos los campos"
      );
      return;
    }

    try {
      await API.post(
        "/auth/register",
        {
          nombre,
          email,
          password,
        }
      );

      toast.success(
        "Usuario registrado correctamente"
      );

      navigate("/");

    } catch (error) {
      toast.error(
        error.response?.data?.mensaje ||
        "Error al registrar usuario"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-title">
          Crear Cuenta
        </h1>

        <form onSubmit={register}>

          <input
            className="auth-input"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) =>
              setNombre(
                e.target.value
              )
            }
          />

          <input
            className="auth-input"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            className="btn-primary"
            type="submit"
          >
            Registrarse
          </button>

        </form>

        <p className="auth-text">
          ¿Ya tienes cuenta?
        </p>

        <Link to="/">
          <button className="btn-secondary">
            Iniciar sesión
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Register;
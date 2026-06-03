import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [contactos, setContactos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [soloFavoritos, setSoloFavoritos] = useState(false);
  const [foto, setFoto] = useState(null);
  const [fotoEditar, setFotoEditar] = useState(null);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
    categoria: "Amigos",
    favorito: false,
  });

  const [editando, setEditando] = useState(null);

  const [editForm, setEditForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
    categoria: "Amigos",
    favorito: false,
  });

  useEffect(() => {
    cargarContactos();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);

    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const cargarContactos = async () => {
    try {
      const { data } = await API.get("/contacts");
      setContactos(data);
    } catch (error) {
      toast.error("Error al cargar contactos");
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const crearContacto = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("nombre", form.nombre);
    formData.append("telefono", form.telefono);
    formData.append("email", form.email);
    formData.append("direccion", form.direccion);
    formData.append("categoria", form.categoria);
    formData.append("favorito", form.favorito);

    if (foto) {
      formData.append("foto", foto);
    }

    await API.post("/contacts", formData);

    toast.success("Contacto guardado");

    setForm({
      nombre: "",
      telefono: "",
      email: "",
      direccion: "",
      categoria: "Amigos",
      favorito: false,
    });

    setFoto(null);

    cargarContactos();
  } catch (error) {
    toast.error("Error al guardar contacto");
  }
};

  const eliminarContacto = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);

      toast.success("Contacto eliminado");

      cargarContactos();
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  const abrirEditor = (contacto) => {
    setEditando(contacto);

    setEditForm({
      nombre: contacto.nombre,
      telefono: contacto.telefono,
      email: contacto.email,
      direccion: contacto.direccion,
      categoria: contacto.categoria,
      favorito: contacto.favorito,
    });
  };

 const guardarEdicion = async () => {
  try {

    const formData = new FormData();

    formData.append("nombre", editForm.nombre);
    formData.append("telefono", editForm.telefono);
    formData.append("email", editForm.email);
    formData.append("direccion", editForm.direccion);
    formData.append("categoria", editForm.categoria);
    formData.append("favorito", editForm.favorito);

    if (fotoEditar) {
      formData.append("foto", fotoEditar);
    }

    await API.put(
      `/contacts/${editando._id}`,
      formData
    );

    toast.success("Contacto actualizado");

    setFotoEditar(null);
    setEditando(null);

    cargarContactos();

  } catch (error) {
    toast.error("Error al actualizar");
  }
};

  const cerrarSesion = () => {
   logout();
    navigate("/");
};

  const contactosFiltrados = contactos.filter(
    (contacto) => {
      const coincideBusqueda =
        contacto.nombre
          ?.toLowerCase()
          .includes(
            busqueda.toLowerCase()
          ) ||
        contacto.email
          ?.toLowerCase()
          .includes(
            busqueda.toLowerCase()
          );

      const coincideFavorito =
        soloFavoritos
          ? contacto.favorito
          : true;

      return (
        coincideBusqueda &&
        coincideFavorito
      );
    }
  );

  const totalFavoritos =
    contactos.filter(
      (c) => c.favorito
    ).length;

  return (
    <div className="dashboard">

      <div className="navbar">

        <h1>📇 ContactosPro</h1>

        <div className="navbar-buttons">

          <button
            className="theme-btn"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode
              ? "☀️ Claro"
              : "🌙 Oscuro"}
          </button>

          <button
            className="logout-btn"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>

        </div>

      </div>

      <div className="stats-grid">

        <div className="stats-card">
          <h3>📇 Contactos</h3>
          <h2>{contactos.length}</h2>
        </div>

        <div className="stats-card">
          <h3>⭐ Favoritos</h3>
          <h2>{totalFavoritos}</h2>
        </div>

      </div>

      <div className="form-card">

        <h2>Nuevo Contacto</h2>

        <form
          onSubmit={crearContacto}
          className="contact-form"
        >

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
          />

            <input
            type="file"
            accept="image/*"
            onChange={(e) =>
            setFoto(e.target.files[0])
            }
          />

          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
          >
            <option>Familia</option>
            <option>Trabajo</option>
            <option>Amigos</option>
            <option>Clientes</option>
          </select>

          <label>
            ⭐ Favorito

            <input
              type="checkbox"
              name="favorito"
              checked={form.favorito}
              onChange={handleChange}
            />
          </label>

          <button type="submit">
            Guardar Contacto
          </button>

        </form>

      </div>

      <div className="filters">

        <input
          className="search-input"
          placeholder="🔍 Buscar..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(e.target.value)
          }
        />

        <button
          className="favorite-filter"
          onClick={() =>
            setSoloFavoritos(
              !soloFavoritos
            )
          }
        >
          {soloFavoritos
            ? "Mostrar Todos"
            : "Solo Favoritos"}
        </button>

      </div>

      <div className="contacts-grid">

        {contactosFiltrados.map(
          (contacto) => (
            <div
              key={contacto._id}
              className="contact-card"
            >
            {contacto.foto && (
              <img
                src={`http://localhost:5000/uploads/${contacto.foto}`}
                alt={contacto.nombre}
                width="100"
              />
            )}  

              <h3>
                {contacto.favorito &&
                  "⭐ "}
                {contacto.nombre}
              </h3>

              <span className="badge">
                {contacto.categoria}
              </span>

              <p>
                📞 {contacto.telefono}
              </p>

              <p>
                📧 {contacto.email}
              </p>

              <p>
                📍 {contacto.direccion}
              </p>

              <button
                className="edit-btn"
                onClick={() =>
                  abrirEditor(contacto)
                }
              >
                Editar
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  eliminarContacto(
                    contacto._id
                  )
                }
              >
                Eliminar
              </button>

            </div>
          )
        )}

      </div>

      {editando && (
        <div className="modal-overlay">

          <div className="modal">

            <h2>Editar Contacto</h2>

            <input
              value={editForm.nombre}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  nombre: e.target.value,
                })
              }
            />

            <input
              value={editForm.telefono}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  telefono: e.target.value,
                })
              }
            />

            <input
              value={editForm.email}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  email: e.target.value,
                })
              }
            />

            <input
              value={editForm.direccion}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  direccion:
                    e.target.value,
                })
              }
            />

            <select
              value={editForm.categoria}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  categoria:
                    e.target.value,
                })
              }
            >
              <option>Familia</option>
              <option>Trabajo</option>
              <option>Amigos</option>
              <option>Clientes</option>
            </select>
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFotoEditar(e.target.files[0])
              }
            />
            <label>
              ⭐ Favorito

              <input
                type="checkbox"
                checked={
                  editForm.favorito
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    favorito:
                      e.target.checked,
                  })
                }
              />
            </label>

            <button
              onClick={
                guardarEdicion
              }
            >
              Guardar Cambios
            </button>

            <button
              onClick={() =>
                setEditando(null)
              }
            >
              Cancelar
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;
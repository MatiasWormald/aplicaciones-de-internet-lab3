import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../utils/api";


export default function LoginPage({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/api/users/login', {
        method: "POST",
        body: JSON.stringify({ email, password: pass })
      });
      setIsAuth(true);
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("user", JSON.stringify(res));
      navigate("/tasks");
    } catch (err) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Logo Uls"
          src="https://www.userena.cl/images/logos_web/descarga/logo-uls-vertical.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-black">
          Ingresa a tu cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Contraseña
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
                className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
            >
              Ingresar
            </button>
          </div>
        </form>

        {/* Botón para ir a registro */}
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-500 hover:text-indigo-400"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

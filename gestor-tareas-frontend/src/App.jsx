import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskBoard from "./pages/TaskBoard";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("isAuth");
    if (logged === "true") setIsAuth(true);
  }, []);

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
  };

  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            isAuth ? <Navigate to="/tasks" /> : <LoginPage setIsAuth={setIsAuth} />
          }
        />

        {/* Registro */}
        <Route
          path="/register"
          element={
            isAuth ? <Navigate to="/tasks" /> : <RegisterPage setIsAuth={setIsAuth} />
          }
        />

        {/* Tablero de tareas */}
        <Route
          path="/tasks"
          element={isAuth ? <TaskBoard onLogout={handleLogout} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

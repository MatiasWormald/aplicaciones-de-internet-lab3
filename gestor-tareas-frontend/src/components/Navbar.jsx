import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { logout } = useAuth();
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link to="/">Dashboard</Link>
      <button onClick={logout}>Salir</button>
    </nav>
  );
}
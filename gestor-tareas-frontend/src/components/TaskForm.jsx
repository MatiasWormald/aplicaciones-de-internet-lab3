import React, { useState, useEffect } from "react";

export default function TaskForm({ onSave, initial }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [status, setStatus] = useState(initial?.status || "Sin iniciar");

  useEffect(() => {
    setTitle(initial?.title || "");
    setStatus(initial?.status || "Sin iniciar");
  }, [initial]);

  const submit = async (e) => {
    e.preventDefault();
    await onSave({ title, status });
    setTitle("");
    setStatus("Sin iniciar");
  };

  return (
    <form onSubmit={submit} className="space-x-2 flex">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea"
        className="border p-1"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-1"
      >
        <option>Sin iniciar</option>
        <option>En progreso</option>
        <option>Completadas</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-2 py-1">
        Guardar
      </button>
    </form>
  );
}

import React from "react";

export default function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <ul className="space-y-2">
      {tasks.map((t) => (
        <li key={t.id} className="flex justify-between border p-2">
          <span>{t.title} - <i>{t.status}</i></span>
          <div className="space-x-2">
            <button onClick={() => onEdit(t)} className="text-blue-500">Editar</button>
            <button onClick={() => onDelete(t.id)} className="text-red-500">Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
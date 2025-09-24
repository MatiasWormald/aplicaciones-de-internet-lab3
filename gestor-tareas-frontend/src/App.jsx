// App.jsx
import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = 'http://localhost:3000/api/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(backendUrl);
      if (!response.ok) throw new Error('Error al obtener tareas');
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Lista de Tareas</h1>
      {tasks.length === 0 ? (
        <p>No hay tareas para mostrar.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <strong>{task.title}</strong> - Estado: {task.status} - Prioridad: {task.priority}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

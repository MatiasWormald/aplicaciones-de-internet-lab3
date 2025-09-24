import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = 'http://localhost:3000/api/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(backendUrl);
      if (!res.ok) throw new Error('Fallo al cargar tareas');
      const data = await res.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("El título es obligatorio");
      return;
    }
    const newTask = { title, status, priority };
    try {
      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      if (!res.ok) throw new Error('Error al crear tarea');
      setTitle('');
      setStatus('todo');
      setPriority('medium');
      await fetchTasks();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Estado:</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="todo">Por hacer</option>
            <option value="inprogress">En progreso</option>
            <option value="done">Hecho</option>
          </select>
        </div>
        <div>
          <label>Prioridad:</label>
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>
        <button type="submit">Agregar tarea</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {tasks.length === 0 ? (
        <p>No hay tareas</p>
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

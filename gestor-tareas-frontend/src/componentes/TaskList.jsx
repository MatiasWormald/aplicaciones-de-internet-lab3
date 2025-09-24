import React from 'react';

function TaskList({ tasks }) {
  if (tasks.length === 0) return <p>No hay tareas.</p>;

  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id || task.id}>
          {task.title} - {task.status}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;

import React, { useState } from "react";
import {
  ExclamationTriangleIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

// Estados disponibles para las columnas
const columns = [
  {
    label: "Por hacer",
    value: "todo",
    icon: ExclamationTriangleIcon,
    color: "bg-yellow-100 text-yellow-700 border-yellow-300",
  },
  {
    label: "En progreso",
    value: "progress",
    icon: ComputerDesktopIcon,
    color: "bg-blue-100 text-blue-700 border-blue-300",
  },
  {
    label: "Hecho",
    value: "done",
    icon: CheckCircleIcon,
    color: "bg-green-100 text-green-700 border-green-300",
  },
];

// Tareas iniciales
const initialTasks = [
  { id: "1", title: "Tarea 1", desc: "Descripción de la tarea 1.", status: "todo" },
  { id: "2", title: "Tarea 2", desc: "Descripción de la tarea 2.", status: "progress" },
  { id: "3", title: "Tarea 3", desc: "Descripción de la tarea 3.", status: "done" },
];

export default function KanbanInfinity({ onLogout }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ title: "", desc: "", status: "todo" });

  // Manejo de drag & drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const updatedTasks = tasks.map((task) =>
      task.id === draggableId ? { ...task, status: destination.droppableId } : task
    );
    setTasks(updatedTasks);
  };

  // Guardar tarea (nueva o editada)
  const handleSaveTask = () => {
    if (!formData.title.trim()) return;

    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...t, ...formData } : t)));
      setEditingTask(null);
    } else {
      const newTask = {
        id: (tasks.length + 1).toString(),
        ...formData,
      };
      setTasks([...tasks, newTask]);
    }

    setFormData({ title: "", desc: "", status: "todo" });
    setShowForm(false);
  };

  // Eliminar tarea
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Abrir edición
  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormData(task);
    setShowForm(true);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col">
      {/* Header con logout */}
      <header className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-md mb-6 shadow">
        <h1 className="text-xl font-bold">Tablero de Tareas</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Botón global para agregar */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditingTask(null);
            setFormData({ title: "", desc: "", status: "todo" });
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          <PlusIcon className="w-5 h-5" />
          Agregar tarea
        </button>
      </div>

      {/* Tablero Kanban */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(({ label, value, icon, color }) => (
            <div
              key={value}
              className="bg-gray-50 rounded-lg shadow-md p-4 border border-gray-200 flex flex-col"
            >
              {/* Header columna */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {React.createElement(icon, { className: "w-6 h-6 text-gray-600" })}
                  <h2 className="font-semibold text-gray-800">{label}</h2>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${color}`}>
                  {tasks.filter((t) => t.status === value).length} tareas
                </span>
              </div>

              {/* Área Droppable */}
              <Droppable droppableId={value}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-1 flex flex-col gap-4 min-h-[100px]"
                  >
                    {tasks
                      .filter((task) => task.status === value)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-100"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
                                  <p className="text-gray-600 text-sm">{task.desc}</p>
                                </div>
                                {/* Botones editar/eliminar */}
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleEditTask(task)}
                                    className="text-blue-500 hover:text-blue-700"
                                  >
                                    <PencilSquareIcon className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <TrashIcon className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                              <span
                                className={`mt-2 inline-block text-xs font-medium px-2 py-1 rounded-full ${color}`}
                              >
                                {label}
                              </span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Modal Formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingTask ? "Editar tarea" : "Nueva tarea"}
            </h2>
            <input
              type="text"
              placeholder="Título"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full mb-2 p-2 rounded border border-gray-300"
            />
            <textarea
              placeholder="Descripción"
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              className="w-full mb-2 p-2 rounded border border-gray-300"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full mb-4 p-2 rounded border border-gray-300"
            >
              {columns.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveTask}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

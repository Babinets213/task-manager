import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Використовуємо useNavigate замість useHistory
import { getTasks, addCollaborator, updateTaskStatus } from '../../services/taskService'; // Сервіси для API запитів

const RoleTaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');
  const [userRole, setUserRole] = useState<'Admin' | 'Viewer'>('Viewer'); // Приклад: role може бути Admin або Viewer
  const navigate = useNavigate(); // useNavigate замість useHistory

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks(); // Запит до API для отримання завдань
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Функція для додавання співучасника
  const handleAddCollaborator = async (taskId: number) => {
    try {
      await addCollaborator(taskId, newCollaboratorEmail);
      setNewCollaboratorEmail('');
      alert('Collaborator added successfully!');
    } catch (error) {
      console.error('Error adding collaborator:', error);
    }
  };

  // Функція для зміни статусу завдання
  const handleStatusChange = async (taskId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      await updateTaskStatus(taskId, newStatus); // Оновлення статусу завдання через API
      setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task)); // Оновлюємо статус локально
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleViewTask = (taskId: number) => {
    navigate(`/tasks/${taskId}`); // Використовуємо navigate для переходу на сторінку завдання
  };

  const handleTaskDelete = (taskId: number) => {
    if (userRole !== 'Admin') {
      alert('Only Admin can delete tasks!');
      return;
    }
    // Логіка видалення завдання
  };

  const handleTaskEdit = (taskId: number) => {
    if (userRole !== 'Admin') {
      alert('Only Admin can edit tasks!');
      return;
    }
    // Логіка редагування завдання
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div>
          <div className="add-collaborator mb-4">
            {userRole === 'Admin' && (
              <div>
                <input
                  type="email"
                  placeholder="Enter email of collaborator"
                  value={newCollaboratorEmail}
                  onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                  className="p-2 mb-4 border rounded"
                />
                <button
                  onClick={() => handleAddCollaborator(1)} // Тут потрібно передати реальний taskId
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Add Collaborator
                </button>
              </div>
            )}
          </div>

          <div className="task-list">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="task-item bg-gray-100 p-4 rounded mb-2 cursor-pointer"
              >
                <h2 className="text-xl">{task.title}</h2>
                <p>{task.description}</p>
                <div className="task-actions mt-4">
                  {userRole === 'Admin' && (
                    <>
                      <button
                        onClick={() => handleTaskEdit(task.id)}
                        className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
                      >
                        Edit Task
                      </button>
                      <button
                        onClick={() => handleTaskDelete(task.id)}
                        className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Delete Task
                      </button>
                    </>
                  )}

                  <button
                    className={`btn ${task.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`}
                    onClick={() => handleStatusChange(task.id, task.status)}
                  >
                    {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleTaskPage;

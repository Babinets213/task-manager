import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Використовуємо useNavigate замість useHistory
import { getTaskById, updateTaskStatus, deleteTask, updateTask } from '../../services/taskService'; // Сервіси для API запитів

const TaskDetailPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>(); // Отримуємо taskId з URL параметрів
  const [task, setTask] = useState<any>(null); // Задаємо тип any для task
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Для контролю редагування
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const navigate = useNavigate(); // Використовуємо useNavigate для навігації

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await getTaskById(Number(taskId)); // Запит до API для отримання завдання за ID
        setTask(fetchedTask);
        setEditedTitle(fetchedTask.title); // Встановлюємо початкові значення для редагування
        setEditedDescription(fetchedTask.description);
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]); // Залежність від taskId

  const handleStatusChange = async (status: string) => {
    try {
      await updateTaskStatus(Number(taskId), status); // Оновлення статусу завдання через API
      setTask({ ...task, status }); // Оновлюємо статус завдання
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/tasks'); // Повернення до списку завдань
  };

  const handleEditTask = () => {
    setIsEditing(true); // Перехід в режим редагування
  };

  const handleSaveTask = async () => {
    if (editedTitle && editedDescription) {
      try {
        const updatedTask = await updateTask(Number(taskId), {
          title: editedTitle,
          description: editedDescription,
        });
        setTask(updatedTask);
        setIsEditing(false); // Виходимо з режиму редагування
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(Number(taskId)); // Видалення завдання через API
      navigate('/tasks'); // Переходимо назад до списку після видалення
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) {
    return <p>Loading task details...</p>; // Показуємо повідомлення під час завантаження
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Task Details</h1>
      <div className="task-detail bg-gray-100 p-4 rounded">
        {/* Якщо ми редагуємо завдання */}
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="p-2 mb-4 border rounded w-full"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="p-2 mb-4 border rounded w-full"
              rows={4}
            />
            <div className="mt-4">
              <button
                onClick={handleSaveTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="ml-4 text-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl mb-2">{task.title}</h2>
            <p>{task.description}</p>
            <div className="mt-4">
              <button
                className={`btn ${task.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`}
                onClick={() => handleStatusChange(task.status === 'completed' ? 'pending' : 'completed')}
              >
                {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
              </button>
              <button
                onClick={handleEditTask}
                className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                Edit Task
              </button>
              <button
                onClick={handleDeleteTask}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete Task
              </button>
            </div>
          </div>
        )}
        <button
          className="mt-4 text-blue-500"
          onClick={handleBackToList}
        >
          Back to Task List
        </button>
      </div>
    </div>
  );
};

export default TaskDetailPage;

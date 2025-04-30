import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import Button from '../components/ui/Button'; 
import Input from '../components/ui/Input'; 
import Loader from '../components/ui/Loader'; 
import { getTaskById, updateTaskStatus, deleteTask, updateTask } from '../../services/taskService'; 
const TaskDetailPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>(); 
  const [task, setTask] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); 
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await getTaskById(Number(taskId)); 
        setTask(fetchedTask);
        setEditedTitle(fetchedTask.title); 
        setEditedDescription(fetchedTask.description);
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]); 

  const handleStatusChange = async (status: string) => {
    try {
      await updateTaskStatus(Number(taskId), status); 
      setTask({ ...task, status }); 
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/tasks'); 
  };

  const handleEditTask = () => {
    setIsEditing(true); 
  };

  const handleSaveTask = async () => {
    if (editedTitle && editedDescription) {
      try {
        const updatedTask = await updateTask(Number(taskId), {
          title: editedTitle,
          description: editedDescription,
        });
        setTask(updatedTask);
        setIsEditing(false); 
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(Number(taskId)); 
      navigate('/tasks'); 
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) {
    return <Loader />; 
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Task Details</h1>
      <div className="task-detail bg-gray-100 p-4 rounded">

        {isEditing ? (
          <div>
            <Input
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
              <Button
                onClick={handleSaveTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                className="ml-4 text-gray-500"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl mb-2">{task.title}</h2>
            <p>{task.description}</p>
            <div className="mt-4">
              <Button
                className={`btn ${task.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`}
                onClick={() => handleStatusChange(task.status === 'completed' ? 'pending' : 'completed')}
              >
                {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
              </Button>
              <Button
                onClick={handleEditTask}
                className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                Edit Task
              </Button>
              <Button
                onClick={handleDeleteTask}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete Task
              </Button>
            </div>
          </div>
        )}
        <Button
          className="mt-4 text-blue-500"
          onClick={handleBackToList}
        >
          Back to Task List
        </Button>
      </div>
    </div>
  );
};

export default TaskDetailPage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getTasks, addCollaborator, updateTaskStatus } from '../services/taskService'; 
import Button from '../components/ui/Button';  
import Input from '../components/ui/Input';  
import Loader from '../components/ui/Loader';  

const RoleTaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');
  const [userRole, setUserRole] = useState<'Admin' | 'Viewer'>('Viewer'); 
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks(); 
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);


  const handleAddCollaborator = async (taskId: number) => {
    try {
      await addCollaborator(taskId, newCollaboratorEmail);
      setNewCollaboratorEmail('');
      alert('Collaborator added successfully!');
    } catch (error) {
      console.error('Error adding collaborator:', error);
    }
  };

  const handleStatusChange = async (taskId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      await updateTaskStatus(taskId, newStatus); 
      setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task)); 
      console.error('Error updating task status:', error);
    }
  };

  const handleViewTask = (taskId: number) => {
    navigate(`/tasks/${taskId}`); 
  };

  const handleTaskDelete = (taskId: number) => {
    if (userRole !== 'Admin') {
      alert('Only Admin can delete tasks!');
      return;
    }
   
  };

  const handleTaskEdit = (taskId: number) => {
    if (userRole !== 'Admin') {
      alert('Only Admin can edit tasks!');
      return;
    }
   
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      {loading ? (
        <Loader />  
      ) : (
        <div>
          <div className="add-collaborator mb-4">
            {userRole === 'Admin' && (
              <div>
                <Input
                  type="email"
                  placeholder="Enter email of collaborator"
                  value={newCollaboratorEmail}
                  onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                  className="p-2 mb-4 border rounded"
                />
                <Button
                  onClick={() => handleAddCollaborator(1)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Add Collaborator
                </Button>
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
                      <Button
                        onClick={() => handleTaskEdit(task.id)}
                        className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
                      >
                        Edit Task
                      </Button>
                      <Button
                        onClick={() => handleTaskDelete(task.id)}
                        className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Delete Task
                      </Button>
                    </>
                  )}

                  <Button
                    onClick={() => handleStatusChange(task.id, task.status)}
                    className={`ml-4 ${task.status === 'completed' ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded-lg`}
                  >
                    {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
                  </Button>
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

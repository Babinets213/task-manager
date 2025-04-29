import { useState, useEffect } from "react";
import axios from "axios";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

type TodoList = {
  id: number;
  name: string;
  tasks: Task[];
};

const TaskListPage = () => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [newListName, setNewListName] = useState<string>("");
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch all to-do lists on page load
  useEffect(() => {
    const fetchTodoLists = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/todolists");
        if (Array.isArray(response.data)) {
          setTodoLists(response.data);
        } else {
          console.error("Expected an array of todo lists, but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching todo lists:", error);
      }
      setIsLoading(false);
    };
    fetchTodoLists();
  }, []);

  // Add a new list
  const handleAddList = async () => {
    if (!newListName) return;
    try {
      const response = await axios.post("/api/todolists", { name: newListName });
      setTodoLists([...todoLists, response.data]);
      setNewListName("");
    } catch (error) {
      console.error("Error adding todo list:", error);
    }
  };

  // Edit list name
  const handleEditListName = async (id: number, newName: string) => {
    if (!newName) return;
    try {
      const response = await axios.put(`/api/todolists/${id}`, { name: newName });
      setTodoLists(todoLists.map((list) => (list.id === id ? response.data : list)));
    } catch (error) {
      console.error("Error editing list name:", error);
    }
  };

  // Delete list
  const handleDeleteList = async (id: number) => {
    try {
      await axios.delete(`/api/todolists/${id}`);
      setTodoLists(todoLists.filter((list) => list.id !== id));
    } catch (error) {
      console.error("Error deleting todo list:", error);
    }
  };

  // Add task to a selected list
  const handleAddTask = async () => {
    if (!newTask || selectedListId === null) return;
    try {
      const response = await axios.post(`/api/todolists/${selectedListId}/tasks`, { title: newTask, description: "" });
      const updatedLists = todoLists.map((list) => {
        if (list.id === selectedListId) {
          return { ...list, tasks: [...list.tasks, response.data] };
        }
        return list;
      });
      setTodoLists(updatedLists);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = async (listId: number, taskId: number) => {
    const list = todoLists.find((list) => list.id === listId);
    if (!list) return;
    const task = list.tasks.find((task) => task.id === taskId);
    if (!task) return;
    try {
      const updatedTask = await axios.put(`/api/tasks/${taskId}`, {
        completed: !task.completed,
      });
      const updatedLists = todoLists.map((l) =>
        l.id === listId
          ? {
              ...l,
              tasks: l.tasks.map((t) =>
                t.id === taskId ? updatedTask.data : t
              ),
            }
          : l
      );
      setTodoLists(updatedLists);
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  // Edit task title
  const handleEditTaskTitle = async (listId: number, taskId: number, newTitle: string) => {
    if (!newTitle) return;
    const list = todoLists.find((list) => list.id === listId);
    if (!list) return;
    const task = list.tasks.find((task) => task.id === taskId);
    if (!task) return;
    try {
      const updatedTask = await axios.put(`/api/tasks/${taskId}`, { title: newTitle });
      const updatedLists = todoLists.map((l) =>
        l.id === listId
          ? {
              ...l,
              tasks: l.tasks.map((t) =>
                t.id === taskId ? updatedTask.data : t
              ),
            }
          : l
      );
      setTodoLists(updatedLists);
    } catch (error) {
      console.error("Error editing task title:", error);
    }
  };

  // Delete task
  const handleDeleteTask = async (listId: number, taskId: number) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      const updatedLists = todoLists.map((list) => {
        if (list.id === listId) {
          return { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) };
        }
        return list;
      });
      setTodoLists(updatedLists);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Task Management</h1>

      {/* Form to add a new list */}
      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
          placeholder="New list name"
        />
        <button
          onClick={handleAddList}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Add List
        </button>
      </div>

      {/* Display to-do lists */}
      {isLoading ? (
        <div className="text-center">Loading todo lists...</div>
      ) : (
        <div className="space-y-4">
          {todoLists.map((list) => (
            <div key={list.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={list.name}
                  onChange={(e) => handleEditListName(list.id, e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg w-2/3"
                />
                <button
                  onClick={() => handleDeleteList(list.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Delete List
                </button>
              </div>

              {/* Form to add a task */}
              <div className="mb-4 flex items-center space-x-4">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="New task title"
                />
                <button
                  onClick={handleAddTask}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add Task
                </button>
              </div>

              {/* Task list */}
              <ul className="space-y-4">
                {list.tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(list.id, task.id)}
                        className="w-5 h-5"
                      />
                      <input
                        type="text"
                        value={task.title}
                        onChange={(e) => handleEditTaskTitle(list.id, task.id, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteTask(list.id, task.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete Task
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskListPage;

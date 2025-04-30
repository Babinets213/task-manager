import { useState, useEffect } from "react";
import Button from "../components/ui/Button"; 
import Input from "../components/ui/Input";  
import Loader from "../components/ui/Loader";  

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

  useEffect(() => {
    const fetchTodoLists = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/todolists");
        if (!response.ok) throw new Error("Failed to fetch todo lists");

        const data = await response.json();
        if (Array.isArray(data)) {
          setTodoLists(data);
        } else {
          console.error("Expected an array of todo lists, but got:", data);
        }
      } catch (error) {
        console.error("Error fetching todo lists:", error);
      }
      setIsLoading(false);
    };
    fetchTodoLists();
  }, []);


  const handleAddList = async () => {
    if (!newListName) return;
    try {
      const response = await fetch("/api/todolists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newListName }),
      });
      if (!response.ok) throw new Error("Failed to add todo list");

      const data = await response.json();
      setTodoLists([...todoLists, data]);
      setNewListName("");
    } catch (error) {
      console.error("Error adding todo list:", error);
    }
  };


  const handleEditListName = async (id: number, newName: string) => {
    if (!newName) return;
    try {
      const response = await fetch(`/api/todolists/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
      if (!response.ok) throw new Error("Failed to edit todo list name");

      const data = await response.json();
      setTodoLists(todoLists.map((list) => (list.id === id ? data : list)));
    } catch (error) {
      console.error("Error editing list name:", error);
    }
  };

  const handleDeleteList = async (id: number) => {
    try {
      const response = await fetch(`/api/todolists/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete todo list");

      setTodoLists(todoLists.filter((list) => list.id !== id));
    } catch (error) {
      console.error("Error deleting todo list:", error);
    }
  };


  const handleAddTask = async () => {
    if (!newTask || selectedListId === null) return;
    try {
      const response = await fetch(`/api/todolists/${selectedListId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTask, description: "" }),
      });
      if (!response.ok) throw new Error("Failed to add task");

      const data = await response.json();
      const updatedLists = todoLists.map((list) => {
        if (list.id === selectedListId) {
          return { ...list, tasks: [...list.tasks, data] };
        }
        return list;
      });
      setTodoLists(updatedLists);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTaskCompletion = async (listId: number, taskId: number) => {
    const list = todoLists.find((list) => list.id === listId);
    if (!list) return;
    const task = list.tasks.find((task) => task.id === taskId);
    if (!task) return;
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });
      if (!response.ok) throw new Error("Failed to toggle task completion");

      const updatedTask = await response.json();
      const updatedLists = todoLists.map((l) =>
        l.id === listId
          ? {
              ...l,
              tasks: l.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
            }
          : l
      );
      setTodoLists(updatedLists);
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };


  const handleEditTaskTitle = async (listId: number, taskId: number, newTitle: string) => {
    if (!newTitle) return;
    const list = todoLists.find((list) => list.id === listId);
    if (!list) return;
    const task = list.tasks.find((task) => task.id === taskId);
    if (!task) return;
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!response.ok) throw new Error("Failed to edit task title");

      const updatedTask = await response.json();
      const updatedLists = todoLists.map((l) =>
        l.id === listId
          ? {
              ...l,
              tasks: l.tasks.map((t) =>
                t.id === taskId ? updatedTask : t
              ),
            }
          : l
      );
      setTodoLists(updatedLists);
    } catch (error) {
      console.error("Error editing task title:", error);
    }
  };

  const handleDeleteTask = async (listId: number, taskId: number) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");

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

      <div className="mb-6 flex items-center space-x-4">
        <Input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New list name"
        />
        <Button onClick={handleAddList} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Add List
        </Button>
      </div>

      {isLoading ? (
        <Loader /> 
      ) : (
        <div className="space-y-4">
          {todoLists.map((list) => (
            <div key={list.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <Input
                  type="text"
                  value={list.name}
                  onChange={(e) => handleEditListName(list.id, e.target.value)}
                />
                <Button
                  onClick={() => handleDeleteList(list.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Delete List
                </Button>
              </div>

     
              <div className="mb-4 flex items-center space-x-4">
                <Input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="New task title"
                />
                <Button
                  onClick={handleAddTask}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add Task
                </Button>
              </div>

              {/* Task list */}
              <ul className="space-y-4">
                {list.tasks.map((task) => (
                  <li key={task.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(list.id, task.id)}
                        className="w-5 h-5"
                      />
                      <Input
                        type="text"
                        value={task.title}
                        onChange={(e) => handleEditTaskTitle(list.id, task.id, e.target.value)}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleDeleteTask(list.id, task.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete Task
                      </Button>
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

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export const useTaskStore = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return { tasks, addTask, updateTask };
};

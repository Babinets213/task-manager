import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';

const taskService = new TaskService();

// Створення нового завдання
export const createTask = async (req: Request, res: Response) => {
  const { title, description, taskListId } = req.body;

  try {
    const task = await taskService.createTask(title, description, taskListId);
    return res.status(201).json(task);  // Повертаємо створене завдання
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Оновлення завдання
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedTask = await taskService.updateTask(Number(id), title, description);
    return res.status(200).json(updatedTask);  // Повертаємо оновлене завдання
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' });
  }
};

// Видалення завдання
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await taskService.deleteTask(Number(id));
    return res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' });
  }
};

// Зміна статусу завдання
export const toggleTaskStatus = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await taskService.toggleTaskStatus(Number(id));
    return res.status(200).json(task);  // Повертаємо завдання зі зміненим статусом
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' });
  }
};

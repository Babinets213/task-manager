import { Router } from 'express';
import { createTask, updateTask, deleteTask, toggleTaskStatus } from '../controllers/taskController';  // Контролери
import { authMiddleware } from '../middleware/authMiddleware';  // Middleware для перевірки автентифікації
import { roleMiddleware } from '../middleware/roleMiddleware';  // Middleware для перевірки ролей
import { validateTaskCreation, validateTaskUpdate } from '../middleware/validationMiddleware';  // Middleware для валідації завдань

const router = Router();

// Маршрут для створення нового завдання
router.post(
  '/create', 
  authMiddleware, 
  roleMiddleware(['admin', 'viewer']), 
  validateTaskCreation, 
  createTask
);

// Маршрут для оновлення існуючого завдання
router.put(
  '/:taskId', 
  authMiddleware, 
  roleMiddleware(['admin']), 
  validateTaskUpdate, 
  updateTask
);

// Маршрут для видалення завдання
router.delete(
  '/:taskId', 
  authMiddleware, 
  roleMiddleware(['admin']), 
  deleteTask
);

// Маршрут для зміни статусу завдання (виконано/невиконано)
router.patch(
  '/:taskId/status', 
  authMiddleware, 
  roleMiddleware(['admin', 'viewer']), 
  toggleTaskStatus
);

export default router;

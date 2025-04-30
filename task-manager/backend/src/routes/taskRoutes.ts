import { Router } from 'express';
import { createTask, updateTask, deleteTask, toggleTaskStatus } from '../controllers/taskController';  
import { authMiddleware } from '../middleware/authMiddleware';  
import { roleMiddleware } from '../middleware/roleMiddleware';  
import { validateTaskCreation, validateTaskUpdate } from '../middleware/validationMiddleware'; 

const router = Router();

router.post(
  '/create', 
  authMiddleware, 
  roleMiddleware(['admin', 'viewer']), 
  validateTaskCreation, 
  createTask
);


router.put(
  '/:taskId', 
  authMiddleware, 
  roleMiddleware(['admin']), 
  validateTaskUpdate, 
  updateTask
);

router.delete(
  '/:taskId', 
  authMiddleware, 
  roleMiddleware(['admin']), 
  deleteTask
);

router.patch(
  '/:taskId/status', 
  authMiddleware, 
  roleMiddleware(['admin', 'viewer']), 
  toggleTaskStatus
);

export default router;

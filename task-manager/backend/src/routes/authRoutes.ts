import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';  // Контролери
import { validateRegistration, validateLogin } from '../middleware/validationMiddleware';  // Middleware для валідації

const router = Router();

// Маршрут для реєстрації нового користувача
router.post('/register', validateRegistration, registerUser);

// Маршрут для логіну користувача
router.post('/login', validateLogin, loginUser);

export default router;

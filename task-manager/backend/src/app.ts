import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { authMiddleware } from './middleware/authMiddleware';

dotenv.config();

const app = express();

// Налаштування CORS (для дозволу доступу з різних доменів)
app.use(cors());

// Для парсингу JSON-даних
app.use(express.json());

// Маршрути
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes); // Лише для авторизованих користувачів

// Обробка помилок
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;

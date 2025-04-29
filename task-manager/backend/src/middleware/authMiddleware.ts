import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { JWT_SECRET_KEY } from '../utils/jwtUtils';

// Інтерфейс для типізації даних з JWT токену
interface JwtPayload {
  userId: number;
}

// Middleware для автентифікації
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    // Додаємо користувача до запиту, щоб у наступних middleware чи контролерах був доступ до користувача
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

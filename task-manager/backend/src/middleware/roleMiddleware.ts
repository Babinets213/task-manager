import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

// Типи ролей користувача
type UserRole = 'admin' | 'viewer';

// Middleware для перевірки ролі користувача
export const roleMiddleware = (requiredRole: UserRole) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Отримуємо користувача з попереднього middleware
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    // Перевіряємо роль користувача
    if (user.role !== requiredRole) {
      return res.status(403).json({ message: `Access denied. Required role: ${requiredRole}` });
    }

    next();
  };
};

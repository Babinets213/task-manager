import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

type UserRole = 'admin' | 'viewer';

export const roleMiddleware = (requiredRole: UserRole) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({ message: `Access denied. Required role: ${requiredRole}` });
    }

    next();
  };
};

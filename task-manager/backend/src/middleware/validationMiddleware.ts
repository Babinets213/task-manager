import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';


export const validateRegistration = [
  body('email')
    .isEmail().withMessage('Invalid email format')
    .notEmpty().withMessage('Email is required'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .notEmpty().withMessage('Password is required'),
  body('confirmPassword')
    .custom((value, { req }) => value === req.body.password).withMessage('Passwords must match'),
  

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateLogin = [
  body('email')
    .isEmail().withMessage('Invalid email format')
    .notEmpty().withMessage('Email is required'),
  body('password')
    .notEmpty().withMessage('Password is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

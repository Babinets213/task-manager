import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await authService.registerUser(name, email, password);
    return res.status(201).json(user);  
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(400).json({ message: 'User already exists' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await authService.loginUser(email, password);
    return res.status(200).json({ token });  
  } catch (error) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
};

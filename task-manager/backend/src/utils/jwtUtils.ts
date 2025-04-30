import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h'; 
export interface JwtPayload {
  userId: number;
}


export const generateToken = (userId: number): string => {
  const payload: JwtPayload = { userId };
  
  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRATION, 
  });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

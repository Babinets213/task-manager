import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h'; // Термін дії токену (за замовчуванням 1 година)

// Інтерфейс для типізації даних, які буде містити JWT
export interface JwtPayload {
  userId: number;
}

// Функція для створення JWT токену
export const generateToken = (userId: number): string => {
  const payload: JwtPayload = { userId };
  
  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRATION, // Термін дії токену
  });
};

// Функція для перевірки і декодування JWT токену
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

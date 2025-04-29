import { PrismaClient, User as PrismaUser } from '@prisma/client';

const prisma = new PrismaClient();

export class User {
  id: number;
  name: string;
  email: string;
  password: string;

  constructor(id: number, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Метод для створення нового користувача
  static async createUser(name: string, email: string, password: string): Promise<PrismaUser> {
    return prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  // Метод для знаходження користувача за email
  static async findByEmail(email: string): Promise<PrismaUser | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  // Метод для знаходження користувача за ID
  static async findById(id: number): Promise<PrismaUser | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}

import { PrismaClient, Task as PrismaTask } from '@prisma/client';

const prisma = new PrismaClient();

export class Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  taskListId: number;
  userId: number;

  constructor(id: number, title: string, description: string | null, status: string, taskListId: number, userId: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.taskListId = taskListId;
    this.userId = userId;
  }

  // Метод для створення нового завдання
  static async createTask(title: string, description: string | null, taskListId: number, userId: number): Promise<PrismaTask> {
    return prisma.task.create({
      data: {
        title,
        description,
        status: 'pending', // За замовчуванням статус "pending"
        taskList: {
          connect: { id: taskListId },
        },
        createdBy: { connect: { id: userId } },
      },
    });
  }

  // Метод для оновлення існуючого завдання
  static async updateTask(taskId: number, title: string, description: string | null): Promise<PrismaTask> {
    return prisma.task.update({
      where: { id: taskId },
      data: { title, description },
    });
  }

  // Метод для видалення завдання
  static async deleteTask(taskId: number): Promise<PrismaTask> {
    return prisma.task.delete({
      where: { id: taskId },
    });
  }

  // Метод для зміни статусу завдання
  static async toggleTaskStatus(taskId: number, status: 'pending' | 'completed'): Promise<PrismaTask> {
    return prisma.task.update({
      where: { id: taskId },
      data: { status },
    });
  }
}

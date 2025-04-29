import { PrismaClient, TaskList as PrismaTaskList } from '@prisma/client';

const prisma = new PrismaClient();

export class TaskList {
  id: number;
  name: string;
  userId: number;

  constructor(id: number, name: string, userId: number) {
    this.id = id;
    this.name = name;
    this.userId = userId;
  }

  // Метод для створення нового списку завдань
  static async createTaskList(name: string, userId: number): Promise<PrismaTaskList> {
    return prisma.taskList.create({
      data: {
        name,
        user: { connect: { id: userId } },
      },
    });
  }

  // Метод для оновлення існуючого списку завдань
  static async updateTaskList(taskListId: number, name: string): Promise<PrismaTaskList> {
    return prisma.taskList.update({
      where: { id: taskListId },
      data: { name },
    });
  }

  // Метод для видалення списку завдань
  static async deleteTaskList(taskListId: number): Promise<PrismaTaskList> {
    return prisma.taskList.delete({
      where: { id: taskListId },
    });
  }
}

import { PrismaClient, TaskAssignee as PrismaTaskAssignee } from '@prisma/client';

const prisma = new PrismaClient();

export class TaskAssignee {
  taskId: number;
  userId: number;

  constructor(taskId: number, userId: number) {
    this.taskId = taskId;
    this.userId = userId;
  }

  // Метод для додавання користувача до завдання
  static async assignUserToTask(taskId: number, userId: number): Promise<PrismaTaskAssignee> {
    return prisma.taskAssignee.create({
      data: {
        task: { connect: { id: taskId } },
        user: { connect: { id: userId } },
      },
    });
  }

  // Метод для видалення співучасника зі завдання
  static async removeUserFromTask(taskId: number, userId: number): Promise<PrismaTaskAssignee> {
    return prisma.taskAssignee.delete({
      where: {
        taskId_userId: { taskId, userId },
      },
    });
  }
}

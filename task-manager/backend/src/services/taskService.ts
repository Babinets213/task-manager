import { PrismaClient } from '@prisma/client';
import { Task } from '../models/Task';  // Модель завдання

const prisma = new PrismaClient();

export class TaskService {
  // Створення нового завдання
  async createTask(title: string, description: string, userId: number, taskListId: number) {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        taskList: {
          connect: { id: taskListId },
        },
        createdBy: { connect: { id: userId } },
      },
    });

    return task;
  }

  // Оновлення існуючого завдання
  async updateTask(taskId: number, title: string, description: string) {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { title, description },
    });

    return updatedTask;
  }

  // Видалення завдання
  async deleteTask(taskId: number) {
    const task = await prisma.task.delete({
      where: { id: taskId },
    });

    return task;
  }

  // Зміна статусу завдання (виконано/невиконано)
  async toggleTaskStatus(taskId: number, status: 'pending' | 'completed') {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    return updatedTask;
  }
}

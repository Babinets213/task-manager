import { PrismaClient } from '@prisma/client';
import { Task } from '../models/Task';  

const prisma = new PrismaClient();

export class TaskService {

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

  async updateTask(taskId: number, title: string, description: string) {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { title, description },
    });

    return updatedTask;
  }

  async deleteTask(taskId: number) {
    const task = await prisma.task.delete({
      where: { id: taskId },
    });

    return task;
  }


  async toggleTaskStatus(taskId: number, status: 'pending' | 'completed') {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    return updatedTask;
  }
}

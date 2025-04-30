import { PrismaClient } from '@prisma/client';

export class Database {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async connect() {
    try {
      await this.prisma.$connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database', error);
      throw error; 
    }
  }

  getPrismaClient() {
    return this.prisma;
  }
}

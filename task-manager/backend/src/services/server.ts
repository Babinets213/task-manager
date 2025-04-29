import app from './app';
import { Database } from '../server/database';

export class Server {
  private database: Database;

  constructor() {
    this.database = new Database(); // Ініціалізація підключення до бази даних
  }

  async start() {
    try {
      // Підключення до бази даних
      await this.database.connect();

      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server', error);
      process.exit(1); // Завершуємо програму, якщо сталася помилка
    }
  }
}

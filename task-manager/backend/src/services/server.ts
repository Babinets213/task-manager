import app from './app';
import { Database } from '../server/database';

export class Server {
  private database: Database;

  constructor() {
    this.database = new Database(); 
  }

  async start() {
    try {
      await this.database.connect();

      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server', error);
      process.exit(1); 
    }
  }
}

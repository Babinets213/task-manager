// src/services/taskService.ts
export class TaskService {
    // Створення нової задачі
    async createTask(taskListId: number, title: string, description: string, token: string) {
      const response = await fetch('http://localhost:5000/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, taskListId }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Щось пішло не так!');
      }
  
      return response.json(); // Повертає створену задачу
    }
  
    // Редагування задачі
    async updateTask(taskId: number, title: string, description: string, token: string) {
      const response = await fetch(`http://localhost:5000/update-task/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Не вдалося оновити задачу!');
      }
  
      return response.json(); // Повертає оновлену задачу
    }
  
    // Видалення задачі
    async deleteTask(taskId: number, token: string) {
      const response = await fetch(`http://localhost:5000/delete-task/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Не вдалося видалити задачу!');
      }
  
      return response.json(); // Повертає підтвердження видалення
    }
  }
  
  export const taskService = new TaskService();
  
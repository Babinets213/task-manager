
export class AuthService {
 
    async registerUser(name: string, email: string, password: string) {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Щось пішло не так!');
      }
  
      return response.json(); 
    }
  
    async loginUser(email: string, password: string) {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Щось пішло не так!');
      }
  
      return response.json(); 
    }
  }
  
  export const authService = new AuthService();
  
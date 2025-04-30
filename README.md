# Task Management System

## Опис проєкту
**Task Management System** — це система для управління завданнями, що дозволяє користувачам створювати, редагувати, видаляти завдання, а також позначати їх як виконані чи невиконані. Це додаток, який складається з двох основних частин: **бекенд** (серверна частина) та **фронтенд** (інтерфейс користувача).

### Основні можливості:
#### Ролі користувачів:
- **Admin**: Повний доступ до всіх функцій системи. Може створювати, редагувати, видаляти завдання, а також позначати завдання як виконані чи невиконані.
- **Viewer**: Має доступ до перегляду завдань і може змінювати їх статус на виконано/невиконано.

#### Управління завданнями:
- **Створення завдань**
- **Оновлення та редагування завдань**
- **Видалення завдань**
- **Позначення завдань як виконаних або невиконаних**
- **Додавання співучасників до завдання через електронну адресу**

--- 


## Технології

### Бекенд:
- **Node.js**
- **Express.js**
- **Prisma**
- **PostgreSQL**
- **JWT (JSON Web Token)**
- **Bcrypt.js**
- **dotenv**

### Фронтенд:
- **React.js**
- **TypeScript**
- **Tailwind CSS**
- **React Router**
- **Axios**

---

## Встановлення та налаштування середовища

### Крок 1: Клонування репозиторію

```bash
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system
```

### Крок 2: Налаштування бекенду

```bash
cd backend
```

Створіть файл `.env` та заповніть:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/taskdb
JWT_SECRET=your_jwt_secret_key
```

Встановіть залежності:

```bash
npm install
npx prisma migrate dev
npm run dev
```

### Крок 3: Налаштування фронтенду

```bash
cd frontend
```

Створіть `.env` файл:

```env
REACT_APP_API_URL=http://localhost:5000
```

Встановіть залежності:

```bash
npm install
npm run dev
```

---

## Тестування API

### Реєстрація

```http
POST http://localhost:5000/api/auth/register
{
  "email": "user@example.com",
  "password": "your_password"
}
```

### Авторизація

```http
POST http://localhost:5000/api/auth/login
{
  "email": "user@example.com",
  "password": "your_password"
}
```

### Створення завдання

```http
POST http://localhost:5000/api/tasks
{
  "title": "New Task",
  "description": "Description of the task"
}
```

### Отримання завдань

```http
GET http://localhost:5000/api/tasks
```

---



## Примітки

- Необхідно мати встановлений PostgreSQL.
- JWT_SECRET має бути унікальним та складним.
- Рекомендована версія Node.js — 16+.

---

## Приклад роботи 
![image](https://github.com/user-attachments/assets/7395634e-b89d-4e6f-84c6-70cb4ce8ebc7)
## Записи в БД PostgreSQL
![image](https://github.com/user-attachments/assets/ea9e1cea-8360-44d0-95cc-d0446e10cdf5)
## Приклад таблиці Users 
![image](https://github.com/user-attachments/assets/2f94210a-35fd-471b-8295-f2e31f2ab98f)
## Якщо це просто користувач то відсутня можливість редагувати завдання чи видаляти 
![image](https://github.com/user-attachments/assets/fefd1dbc-2726-49fa-b125-a08825b72402)



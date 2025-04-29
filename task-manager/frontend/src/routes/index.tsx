// src/routes/index.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage'; // Імпортуємо сторінку логіну
import RegisterPage from '../pages/auth/RegisterPage'; // Імпортуємо сторінку реєстрації
import TaskListPage from '../pages/tasks/TaskListPage'; // Імпортуємо TaskListPage
import TaskDetailPage from '../pages/tasks/TaskDetailPage'; // Імпортуємо TaskDetailPage

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} /> {/* За замовчуванням відкривається Login */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} /> {/* Сторінка реєстрації */}
      <Route path="/tasks" element={<TaskListPage />} />
      <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
    </Routes>
  );
};

export default AppRoutes;

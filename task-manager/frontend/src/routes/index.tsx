import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage'; 
import RegisterPage from '../pages/RegisterPage'; 
import TaskListPage from '../pages/TaskListPage'; 
import TaskDetailPage from '../pages/TaskDetailPage'; 
import PrivateRoute from '../components/PrivateRoute'; 
import { AuthProvider } from '../context/AuthContext'; 

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <PrivateRoute path="/tasks" element={<TaskListPage />} /> 
        <PrivateRoute path="/tasks/:taskId" element={<TaskDetailPage />} /> 
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;

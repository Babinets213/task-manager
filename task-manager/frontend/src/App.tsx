// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Імпортуємо Router
import AppRoutes from './routes'; // Імпортуємо маршрути з routes/index.tsx

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes /> {/* Підключаємо маршрути */}
    </Router>
  );
};

export default App;

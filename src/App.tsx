// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/dashboardLayout';
import MainDashboard from './pages/MainDashboard';
import UsersPage from './pages/UserPage';
import UserDetailPage from './pages/UserDetails';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<MainDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="user/:id" element={<UserDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
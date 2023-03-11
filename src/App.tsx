import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { Header } from './components';
import { Auth, Calendar, Dashboard } from './Pages';
import { Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAuthContext } from './context/auth-provider';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';

const App = () => {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/login') {
      navigate('/login');
    }
    if (isLoggedIn && location.pathname === '/login') {
      navigate('/');
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Container>
    </LocalizationProvider>
  );
};

export default App;

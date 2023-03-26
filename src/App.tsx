import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { Header } from './components';
import { Auth, Calendar, Dashboard } from './pages';

import { useAuthContext } from './context';
// import { logger } from './logger';

import './App.css';

const App = () => {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  // logger test
  // logger.debug('Debug message');
  // logger.warn('Warning message');
  // logger.error('Error message');

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

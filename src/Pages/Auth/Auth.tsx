import React, { FC, useState } from 'react';
import { Button, TextField, Box, Grid } from '@mui/material';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  Auth as AuthType,
  UserCredential,
} from 'firebase/auth';

import { auth } from '../../firebase/config';
import { useAuthContext } from '../../context/auth-provider';

import './Auth.css';

export const Auth: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, isLoggedIn } = useAuthContext();

  const hidingMessageDelay = 4000;

  const showErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage.replace('auth/', '').replace(/-/g, ' '));
    setTimeout(() => {
      setErrorMessage('');
    }, hidingMessageDelay);
  };

  const handleAuthAction = async (
    callback: (
      auth: AuthType,
      login: string,
      password: string
    ) => Promise<UserCredential>
  ) => {
    try {
      await callback(auth, login, password);
      setLogin('');
      setPassword('');
    } catch ({ code }) {
      showErrorMessage(code as string);
    }
  };

  const handleLogin = () => {
    handleAuthAction(signInWithEmailAndPassword);
  };

  const handleRegister = () => {
    handleAuthAction(createUserWithEmailAndPassword);
  };

  const handleLogout = () => {
    signOut(auth).catch((error) => console.log('Log out error: ', error));
  };

  return (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Box
        sx={{
          width: 300,
          textAlign: 'center',
        }}
      >
        <h2 className="header">
          {isLoggedIn
            ? `You've been logged in via ${user?.email}`
            : 'Authentification'}
        </h2>
        {!isLoggedIn && (
          <>
            <TextField
              name="login"
              label="Login"
              type="text"
              margin="dense"
              fullWidth
              variant="standard"
              onChange={(data) => setLogin(data.target.value)}
              value={login}
              required
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              margin="dense"
              fullWidth
              variant="standard"
              onChange={(data) => setPassword(data.target.value)}
              value={password}
              required
            />
          </>
        )}
        {!isLoggedIn && (
          <>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleRegister}>Register</Button>
          </>
        )}
        {errorMessage !== '' && (
          <p className="text auth-error">{errorMessage}</p>
        )}
        {isLoggedIn && <Button onClick={handleLogout}>Log out</Button>}
      </Box>
    </Grid>
  );
};

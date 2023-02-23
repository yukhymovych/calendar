import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useAuthContext } from "../../Context/AuthProvider";
import "./Auth.css";

export const Auth: FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, isLoggedIn } = useAuthContext();

  const showErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage.replace("auth/", "").replace(/-/g, " "));
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, login, password)
      .then(() => {
        setLogin("");
        setPassword("");
      })
      .catch((error) => {
        showErrorMessage(error.code);
      });
  };

  const handleLogout = async () => {
    signOut(auth).catch((error) => console.log("Log out error: ", error));
  };

  const handleRegister = async () => {
    await createUserWithEmailAndPassword(auth, login, password)
      .then(() => {
        setLogin("");
        setPassword("");
      })
      .catch((error) => {
        showErrorMessage(error.code);
      });
  };

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Box sx={{ width: 300, textAlign: "center" }}>
        <h2 className="header">
          {isLoggedIn
            ? `You've been logged in via ${user?.email}`
            : "Authentification"}
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
        {errorMessage !== "" && <p className="text auth-error">{errorMessage}</p>}
        {isLoggedIn && <Button onClick={handleLogout}>Log out</Button>}
      </Box>
    </Grid>
  );
};

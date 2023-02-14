import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

const Auth = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user?.email) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, login, password)
      .then(() => {
        setLogin("");
        setPassword("");
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log("Login error: ", error);
      });
  };

  const handleLogout = async () => {
    signOut(auth).catch((error) => console.log("Log out error: ", error));
    setIsLoggedIn(false);
  };

  const handleRegister = async () => {
    await createUserWithEmailAndPassword(auth, login, password)
      .then(() => {
        setLogin("");
        setPassword("");
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log("Register error: ", error);
      });
  };

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Box sx={{ width: 300, textAlign: "center" }}>
        <h2 className="h2">{isLoggedIn ? user.email : "Authentification"}</h2>
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
        {isLoggedIn && <Button onClick={handleLogout}>Log out</Button>}
      </Box>
    </Grid>
  );
};

export default Auth;

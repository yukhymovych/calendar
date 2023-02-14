import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { Header } from "./components";
import Dashboard from "./Dashboard/Dashboard";
import Calendar from "./Calendar/Calendar";
import Auth from "./Auth/Auth";
import { Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useAuthContext } from "./Context/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";

const App = () => {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/login" element={<Auth />} />
          </Routes>
        </Container>
      </div>
    </LocalizationProvider>
  );
};

export default App;

import React from "react";
import { Container } from "@mui/material";
import Header from "./Header/Header";
import Dashboard from "./Dashboard/Dashboard";
import Calendar from "./Calendar/Calendar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./App.css";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <div className="App">
          <Container>
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export default App;

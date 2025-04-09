import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";  // Import Navigate
import Login from "./components/Login";
import Register from "./components/Register";
import "./index.css";

function App() {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  );
}

export default App;

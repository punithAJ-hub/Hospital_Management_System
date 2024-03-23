import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import WelcomePage from "../pages/WelcomePage/WelcomePage";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />

      <Route path="/HomePage" element={<HomePage />} />
    </Routes>
  );
}

export default AppRoute;

import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import WelcomePage from "../pages/WelcomePage/WelcomePage";

function AppRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/HomePage" element={<HomePage />}></Route>
      </Routes>
    </>
  );
}

export default AppRoute;

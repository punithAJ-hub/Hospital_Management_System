import React from "react";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage/WelcomePage";

function AppRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
      </Routes>
    </>
  );
}

export default AppRoute;

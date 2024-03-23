import { useState } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import SignIn from "./components/SignIn/SignIn";

function App() {
  return (
    <>
      <AppRoute />
    </>
  );
}

export default App;

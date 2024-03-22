import { useState } from "react";
import React from "react";
import Message from "./components/Message";
import ListGroup from "./components/ListGroup";
import { Routes, Route } from "react-router-dom";
import AppRoute from "./routes/AppRoute";

function App() {
  return (
    <>
      <AppRoute />
    </>
  );
}

export default App;

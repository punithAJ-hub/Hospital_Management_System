import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "./components/NavBar/NavBar";
import "../src/App.css";

import AppRoute from "./routes/AppRoute";

import AuthProvider from "./utils/AuthProvider";

function App() {
  const theme = createTheme({
    direction: "ltr",
    // other theme properties
  });
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <div>
          <div className="fixed-top h-auto">
            <NavBar />
          </div>
          <AppRoute />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

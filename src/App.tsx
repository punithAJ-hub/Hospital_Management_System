import React from "react";

import AppRoute from "./routes/AppRoute";

import AuthProvider from "./utils/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <AppRoute />
      </AuthProvider>
    </>
  );
}

export default App;

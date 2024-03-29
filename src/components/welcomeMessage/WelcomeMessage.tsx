import React, { useEffect } from "react";
import "../../components/welcomeMessage/WelcomeMessage.css";

function WelcomeMessage({ message }) {
  return (
    <>
      <h1>CarePro</h1>
      <h3>{message}</h3>
    </>
  );
}

export default WelcomeMessage;

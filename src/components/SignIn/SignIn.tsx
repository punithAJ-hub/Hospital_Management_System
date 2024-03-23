import { Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const user = await fetch("http://localhost:3000/users/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (user.status === 200) {
      navigate("/HomePage");
    } else if (user.status === 404) {
      setErrorMessage("Unable to find user. Please check your EmailID");
    } else {
      setErrorMessage("Email ID/Password incorrect.");
    }
  };

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="loginName">
            Email or username
          </label>
          <input
            type="email"
            id="loginName"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="loginPassword">
            Password
          </label>
          <input
            type="password"
            id="loginPassword"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="row mb-4">
          <div className="col-md-6 d-flex justify-content-center">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>

        {errorMessage && <Typography color={"red"}>{errorMessage}</Typography>}
      </form>
    </>
  );
}

export default SignIn;

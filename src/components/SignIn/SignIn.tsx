import { Typography } from "@mui/material";
import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { ErrorResponse, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import AppRoute from "../../routes/AppRoute";

import API from "../../utils/API";

function SignIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setErrorMessage("");
  }, [formData.email, formData.password]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("before sending In sighiN ", formData);

    try {
      const response = await API.post("/users/signIn", formData).then(
        (res: AxiosResponse) => {
          console.log("Logging data", res);

          return res;
        }
      );

      if (response.status === 200) {
        navigate("/HomePage");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("Unable to find user. Please check your EmailID");
      } else {
        console.error("An error occurred:", error);
        setErrorMessage("Email ID/Password is incorrect.");
      }
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

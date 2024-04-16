import React from "react";
import "../../components/SignUp/signup.css";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

import API from "../../utils/API";

function SignUp() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setErrorMessage("");
    setSuccessMessage("");
  }, [formData]);

  // Event handler for form submission
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      // console.log("Before sending data formdata is : ", formData);

      // Send form data to backend
      const response = await API.post("/users/signUp", formData).then(
        (data) => {
          // console.log(data);
          return data;
        }
      );

      // console.log("Status", response.status);

      if (response.status === 200) {
        setSuccessMessage("Successfully Registered.");
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setErrorMessage("User Already exists. Please SignIn.");
      } else if (error.response.status == 500) {
        setErrorMessage(" Something went wrong. Please try again.");
      }
    }
  };

  // Event handler for input changes
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
          <label className="form-label" htmlFor="registerName">
            Name
          </label>
          <input
            type="text"
            id="registerName"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="registerEmail">
            Email
          </label>
          <input
            type="email"
            id="registerEmail"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="registerPassword">
            Password
          </label>
          <input
            type="password"
            id="registerPassword"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="registerRepeatPassword">
            Repeat password
          </label>
          <input
            type="password"
            id="registerRepeatPassword"
            className="form-control"
            name="repeatPassword"
            onChange={handleInputChange}
          />
        </div>

        <button
          data-mdb-ripple-init
          type="submit"
          className="btn btn-primary btn-block mb-3"
        >
          Sign Up
        </button>

        {successMessage && (
          <Typography color={"green"}>{successMessage}</Typography>
        )}
        {errorMessage && <Typography color={"red"}>{errorMessage}</Typography>}
      </form>
    </>
  );
}

export default SignUp;

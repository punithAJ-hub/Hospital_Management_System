import React from "react";
import "../../components/SignUp/signup.css";
import { useState } from "react";
import Typography from "@mui/material/Typography";

function SignUp() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Event handler for form submission
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      console.log("Before sending data formdata is : ", formData);

      // Send form data to backend
      const response = await fetch("http://localhost:3000/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setErrorMessage("Something went wrong. Please try again.");
        throw new Error("Failed to submit form");
      } else {
        setSuccessMessage("Successfully Register.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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

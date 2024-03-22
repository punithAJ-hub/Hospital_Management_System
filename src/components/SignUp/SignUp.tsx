import React from "react";
import "../../components/SignUp/signup.css";
import { useState } from "react";

function SignUp() {
  return (
    <>
      <form>
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="registerName">
            Name
          </label>
          <input type="text" id="registerName" className="form-control" />
        </div>
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="registerEmail">
            Email
          </label>
          <input type="email" id="registerEmail" className="form-control" />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="registerPassword">
            Password
          </label>
          <input
            type="password"
            id="registerPassword"
            className="form-control"
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
          />
        </div>

        <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="registerCheck"
            checked
            aria-describedby="registerCheckHelpText"
          />
          <label className="form-check-label" htmlFor="registerCheck">
            I have read and agree to the terms
          </label>
        </div>

        <button
          data-mdb-ripple-init
          type="submit"
          className="btn btn-primary btn-block mb-3"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignUp;

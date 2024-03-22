import React from "react";

function SignIn() {
  return (
    <>
      <form>
        <div data-mdb-input-init className="form-outline mb-4">
          <input type="email" id="loginName" className="form-control" />
          <label className="form-label" htmlFor="loginName">
            Email or username
          </label>
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <input type="password" id="loginPassword" className="form-control" />
          <label className="form-label" htmlFor="loginPassword">
            Password
          </label>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 d-flex justify-content-center">
            <div className="form-check mb-3 mb-md-0">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="loginCheck"
                checked
              />
              <label className="form-check-label" htmlFor="loginCheck">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>
      </form>
    </>
  );
}

export default SignIn;

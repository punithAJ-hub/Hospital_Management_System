import React from "react";
import "../../components/NavBar/navbar.css";
import { useAuth } from "../../utils/AuthProvider";
import AccountMenu from "../AccountMenu/AccountMenu";
import logo from "../../assets/images/logo.png";

function NavBar() {
  const { token } = useAuth();
  console.log("Token during startUp", token);

  return (
    <nav
      className="navbar navbar-expand-lg  navbar-dark  py-2 px-5"
      style={{ backgroundColor: "#102C57" }}
    >
      <img src={logo} alt="" style={{ width: "100px", height: "80px" }} />
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse d-flex justify-content-end "
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ">
          <li className="nav-item active me-4">
            {token && (
              <a
                className="nav-link"
                href="/HomePage"
                style={{ color: "white" }}
              >
                Home
              </a>
            )}
          </li>
          <li className="nav-item me-4">
            <a className="nav-link" href="#" style={{ color: "white" }}>
              About Us
            </a>
          </li>
          <li className="nav-item me-4">{token && <AccountMenu />}</li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

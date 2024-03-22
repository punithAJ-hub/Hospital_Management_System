import React from "react";
import "../../components/NavBar/navbar.css";

function NavBar() {
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-light  fixed-top py-4 px-5">
        <a className="navbar-brand " href="#">
          Navbar
        </a>
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
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item me-4">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>

            <li className="nav-item  me-4">
              <a className="nav-link" href="#">
                Disabled
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

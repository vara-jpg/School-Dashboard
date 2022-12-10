import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";

const NavBar = () => {
  const { isAuth, setisAuth } = useApp();
  console.log("hoilaaa ");

  const LogOutHandler = () => {
    localStorage.removeItem("token");
    setisAuth(null);
  };

  return (
    <header
      style={{ width: "100%" }}
      className="d-flex flex-wrap justify-content-around py-3 border-bottom"
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <span className="fs-2">School Dashboard</span>
      </a>
      <div />
      <ul className="nav nav-pills">
        {isAuth ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/students">
                Students Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/teachers">
                Teachers Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-secondary" onClick={LogOutHandler}>
                Log out
              </button>
            </li>{" "}
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default NavBar;

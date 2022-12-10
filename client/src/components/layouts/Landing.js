import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";

const Landing = () => {
  const { isAuth } = useApp();

  console.log("landing");

  return (
    <div className="bg" style={{ backgroundColor: "transparent" }}>
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large text-white">School dashboard</h1>
          {isAuth ? (
            <>
              <p className="lead text-white">View Students and Teachers Data</p>

              <div className="buttons">
                <Link
                  to="/students"
                  className="btn btn-primary mx-2"
                  style={{ width: "45%" }}
                >
                  Students Dashboard
                </Link>
                <Link
                  to="/teachers"
                  className="btn btn-light mx-2"
                  style={{ width: "45%" }}
                >
                  Teacher Dashboard
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="lead text-white">
                Create a dashboard for Students and Teachers
              </p>

              <div className="buttons">
                <Link
                  to="/register"
                  className="btn btn-primary mx-2"
                  style={{ width: "45%" }}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="btn btn-light mx-2"
                  style={{ width: "45%" }}
                >
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Landing.propTypes = {
//   isAuthenticated: PropTypes.bool
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });

export default Landing;

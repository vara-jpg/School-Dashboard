import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useApp } from "../contexts/AppContext";
import Alert from "../components/layouts/Alert";

const Register = () => {
  const { isAuth, setisAuth } = useApp();
  const [Error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("didnt match");
      setError([{ msg: "Passwords do not match", type: "danger" }]);
    } else {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const cur = { name, email, password };
      const body = JSON.stringify(cur);
      try {
        let resp = await axios.post("/api/auth/register", body, config);
        setError([{ msg: "User Registered Successfully ", type: "success" }]);
        setisAuth(resp.data.token);
        console.log(resp.data);
      } catch (err) {
        const msg = err.response.data.errors;
        console.log("here ", msg);
        const type = "danger";
        setError([...msg, type]);
        console.log("eror in register", err);
      }
    }
  };

  return (
    <>
      {Error &&
        // setTimeout(() => {
        //   setMsg(null);
        // }, 5000)

        Error.map((cur) => {
          return <Alert {...cur} id={Math.floor(Math.random() * 100)} />;
        })}
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>

      {isAuth && <Navigate to="/" />}
    </>
  );
};

export default Register;

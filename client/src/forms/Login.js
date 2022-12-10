import React, { useState, useContext } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import axios from "axios";
import { useApp } from "../contexts/AppContext";
import Alert from "../components/layouts/Alert";

const Login = () => {
  const { isAuth, setisAuth } = useApp();

  const [Msg, setMsg] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const cur = { email, password };
    const body = JSON.stringify(cur);
    try {
      console.log("calling api ..", isAuth);
      let resp = await axios.post(
        "http://localhost:5000/api/auth/login",
        body,
        config
      );
      console.log(resp.data.token);
      localStorage.setItem("token", resp.data.token);
      setisAuth(resp.data.token);
    } catch (err) {
      const msg = err.response.data.errors;
      setMsg([...msg]);
      console.log("eror in register", err.response.data.errors);
    }
  };

  return (
    <>
      {Msg &&
        // setTimeout(() => {
        //   setMsg(null);
        // }, 5000)

        Msg.map((cur) => {
          return <Alert {...cur} id={Math.floor(Math.random() * 100)} />;
        })}

      <section className="container">
        <h1 className="large my-3">Sign In</h1>

        <form className="form" onSubmit={onSubmit}>
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
              minLength="3"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
      {isAuth && <Navigate to="/" />}
    </>
  );
};

export default Login;

import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";
import Dashboard from "../layouts/Dashboard";
import TDashboard from "./TDashboard";

const Teacher = () => {
  const { TeacherData, setTeacherData, isAuth } = useApp();
  console.log("here = ", TeacherData);

  useEffect(() => {
    const fun = async () => {
      try {
        const config = {
          headers: {
            "x-auth-token": isAuth,
          },
        };
        let resp = await axios.get(
          "http://localhost:5000/api/teachers",
          config
        );
        console.log("stu data =  ", resp);
        setTeacherData(resp.data);
      } catch (err) {
        console.log("data fetching failed", err);
      }
    };

    fun();
  }, []);

  return (
    <>
      <div style={{ width: "80%", margin: "20px auto" }}>
        <Link className="text-white" to="/teachersform">
          <button className="btn btn-primary my-4" style={{ width: "100%" }}>
            {" "}
            Add Data{" "}
          </button>
        </Link>
        {TeacherData.map((data) => {
          return <TDashboard {...data} key={data._id} />;
        })}
      </div>
      {!isAuth && <Navigate to="/" />}
    </>
  );
};

export default Teacher;

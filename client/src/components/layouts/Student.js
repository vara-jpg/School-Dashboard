import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";
import Dashboard from "../layouts/Dashboard";

const Student = () => {
  const { StudentData, setStudentData, isAuth } = useApp();
  console.log("here = ", StudentData);

  useEffect(() => {
    const fun = async () => {
      try {
        const config = {
          headers: {
            "x-auth-token": isAuth,
          },
        };
        let resp = await axios.get(
          "http://localhost:5000/api/students",
          config
        );
        console.log("stu data =  ", resp.data);
        setStudentData(resp.data);
      } catch (err) {
        console.log("data fetching failed", err);
      }
    };

    fun();
  }, []);

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <Link className="text-white" to="/studentsform">
        <button className="btn btn-primary my-4" style={{ width: "100%" }}>
          {" "}
          Add Data{" "}
        </button>
      </Link>
      {StudentData.map((data) => {
        return <Dashboard {...data} key={data._id} />;
      })}

      {!isAuth && <Navigate to="/" />}
    </div>
  );
};

export default Student;

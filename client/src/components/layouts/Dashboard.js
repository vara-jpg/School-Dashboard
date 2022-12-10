import axios from "axios";
import React, { Fragment } from "react";
import { useApp } from "../../contexts/AppContext";
import Alert from "./Alert";

const Dashboard = ({
  name,
  _id,
  rollNum,
  fatherName,
  address,
  Class,
  phoneNum,
}) => {
  const { setStudentData, isAuth } = useApp();

  const DeleteItem = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": isAuth,
      },
    };
    try {
      console.log("calling api ..", isAuth);
      let resp = await axios.delete(
        `http://localhost:5000/api/students/${_id}`,
        config
      );
      <Alert msg="User deleted succesfully" type="success" />;
      console.log("result = ", resp.data);
      setStudentData(resp.data);
    } catch (err) {
      console.log("error deleting ", err);
    }
  };

  return (
    <div className="card mb-3 px-3" style={{ width: "100%" }}>
      <div className="row g-0">
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">
            {rollNum && <small className="text-muted">{rollNum}</small>}
            {fatherName && <small className="text-muted">{fatherName}</small>}
          </p>
          ~
          <p className="card-text">
            {address} {phoneNum}
          </p>
          <div>
            {Class}
            {/* {typeof Class === "number"
              ? Class
              : Class.map((i, idx) => <span key={idx}>{i}</span>)} */}
          </div>
        </div>
      </div>
      <button className="btn btn-primary m-3" onClick={DeleteItem}>
        Delete
      </button>
    </div>
  );
};

export default Dashboard;

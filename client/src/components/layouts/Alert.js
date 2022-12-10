import React from "react";

const Alert = ({ msg, type, id }) => {
  console.log("msg ", msg);
  if (!type) type = "danger";
  if (!msg) return;
  return (
    <div key={id} className={`alert alert-${type}`}>
      {msg}
    </div>
  );
};

export default Alert;

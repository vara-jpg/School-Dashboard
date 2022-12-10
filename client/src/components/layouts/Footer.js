import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <footer
      style={{ width: "100%" }}
      className="d-flex flex-wrap justify-content-between align-items-center py-3 mb-4 border-top"
    >
      <div className="col-md-4 d-flex align-items-center">
        <a
          href="/"
          className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
        >
          VaraPrasad
        </a>
        <span className="mb-3 mb-md-0 text-muted">
          © 2022 All rights reserved
        </span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3 mx-3">
          <a className="text-muted" href="#">
            <MDBIcon fab icon="twitter" />
          </a>
        </li>
        <li className="ms-3 mx-3">
          <a className="text-muted" href="#">
            <MDBIcon fab icon="instagram" />
          </a>
        </li>
        <li className="ms-3 mx-3">
          <a className="text-muted" href="#">
            <MDBIcon fab icon="facebook-f" />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

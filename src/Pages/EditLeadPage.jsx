import React from "react";
import Sidenav from "../Components/Sidenav";
import { Link } from "react-router-dom";

function EditLeadPage() {
  return (
    <div className="" style={{ background: "#cff4fc" }}>
      <div className="container-fluid">
        <h1 className="text-center py-2 m-0 bg-info-subtle">Edit Lead Page</h1>
        <div className="row">
          <div className="col-md-2">
            <Sidenav />
          </div>
          <div className="col-md-10 p-4" style={{ background: "#fff" }}>
            <Link to="/" className="btn btn-outline-info fs-5 fw-medium mb-4">
              Back to Dashboard
            </Link>
            <p> EditLeadPage</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditLeadPage;

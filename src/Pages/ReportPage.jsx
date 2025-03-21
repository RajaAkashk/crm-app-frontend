import React from "react";
import Sidenav from "../Components/Sidenav";

function ReportPage() {
  return (
    <div className="" style={{ background: "#cff4fc" }}>
      <div className="container-fluid">
        <h1 className="text-center py-2 m-0 bg-info-subtle">Report</h1>
        <div className="row">
          <div className="col-md-2">
            <Sidenav />
          </div>
          <div className="col-md-10" style={{ background: "#fff" }}>
            Report Page
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;

import React from "react";
import Sidenav from "../Components/Sidenav";
import LeadView from "../Features/leads/LeadView";

function HomePage() {
  return (
    <div className="" style={{ background: "#cff4fc" }}>
      <div className="container-fluid">
        <h1 className="text-center py-2 m-0 bg-info-subtle">
          Avanaya CRM Dashboard
        </h1>
        <div className="row">
          <div className="col-md-2">
            <Sidenav />
          </div>
          <div className="col-md-10" style={{ background: "#fff" }}>
            <LeadView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

import React from "react";
import Sidenav from "../Components/Sidenav";

function HomePage() {
  return (
    <div className="container-fluid">
      <h1 className="text-center py-2 m-0 bg-info-subtle text-info-emphasis">
        Avanaya CRM Dashboard
      </h1>
      <div className="row">
        <div className="col-md-2">
          <Sidenav />
        </div>
        <div className="col-md-10"></div>
      </div>
    </div>
  );
}

export default HomePage;

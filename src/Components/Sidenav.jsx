import React from "react";
import { NavLink } from "react-router-dom";

function Sidenav() {
  return (
    <div className="bg-info-subtle p-3 text-center vh-100">
      <h2>Sidebar</h2>

      <nav className="d-flex flex-column">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-black fs-5 fw-medium mb-3  ${isActive ? "active-link" : ""}`
          }
        >
          Leads
        </NavLink>

        <NavLink
          to="/salesAgent"
          className={({ isActive }) =>
            `text-black fs-5 fw-medium mb-3  ${isActive ? "active-link" : ""}`
          }
        >
          Sales Agents
        </NavLink>
        <NavLink
          to="/report"
          className={({ isActive }) =>
            `text-black fs-5 fw-medium  mb-3 ${isActive ? "active-link" : ""}`
          }
        >
          Reports
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `text-black fs-5 fw-medium  mb-3 ${isActive ? "active-link" : ""}`
          }
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidenav;

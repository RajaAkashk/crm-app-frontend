import React from "react";
import { NavLink } from "react-router-dom";

function Sidenav() {
  return (
    <div className="bg-info-subtle p-3 text-center vh-100">
      <h2 className="text-info-emphasis">Sidebar</h2>
      <nav className="d-flex flex-column">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-black fs-5 fw-medium text-info-emphasis ${
              isActive ? "active-link" : ""
            }`
          }
        >
          Leads
        </NavLink>
        <NavLink
          to="/sales"
          className={({ isActive }) =>
            `text-black fs-5 fw-medium text-info-emphasis ${
              isActive ? "active-link" : ""
            }`
          }
        >
          Sales
        </NavLink>
        <NavLink
          to="/agents"
          className={({ isActive }) =>
            `text-black fs-5 fw-medium text-info-emphasis ${
              isActive ? "active-link" : ""
            }`
          }
        >
          Agents
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `text-black fs-5 fw-medium text-info-emphasis ${
              isActive ? "active-link" : ""
            }`
          }
        >
          Reports
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `text-black fs-5 fw-medium  text-info-emphasis${
              isActive ? "active-link" : ""
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidenav;

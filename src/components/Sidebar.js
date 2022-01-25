import React from "react";
import { NavLink } from "react-router-dom";

import dashboard_icon from "../assets/dashboard_icon.svg";
import add_icon from "../assets/add_icon.svg";

// styles
import "./Sidebar.css"
export default function Sidebar() {
  return (
    <div>
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="user">
            <p>Hello user</p>
          </div>
          <nav className="links">
            <ul>
              <li>
                <NavLink to="/">
                  <img src={dashboard_icon} alt="dashboard icon" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="create">
                  <img src={add_icon} alt="add icon" />
                  <span>New Project</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

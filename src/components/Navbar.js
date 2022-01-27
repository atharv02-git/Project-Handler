import React from "react";
import { Link } from "react-router-dom";

// hooks
import { useLogout } from "../hooks/useLogout";

// Styles & Images
import "./Navbar.css";
import Temple from "../assets/temple.svg";

export default function Navbar() {
  const { logout, isPending } = useLogout();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="project logo" />
          <span>TheProjectHandler</span>
        </li>

        <li>
          <Link to="login">Login</Link>
        </li>
        <li>
          <Link to="signup">signup</Link>
        </li>
        <li>
          {!isPending && (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
          {isPending && (
            <button className="btn" disabled>
              Logging out...
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

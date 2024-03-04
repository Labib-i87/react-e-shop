import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavigationBar.css";
import AuthContext from "../context/AuthContext";

const NavigationBar = () => {
  const { loggedIn, role, getLoggedOut } = useContext(AuthContext);

  return (
    <nav>
      <ul className="list">
        <li>
          <NavLink to="/" exact>
            E-SHOP
          </NavLink>
        </li>
        {loggedIn === false && (
          <>
            <li className="nav-items">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="nav-items">
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </>
        )}

        {loggedIn === true && (
          <>
            {role === "buyer" ? (
              <li className="nav-items">
                <NavLink to="/cart">Cart</NavLink>
              </li>
            ) : (
              <li className="nav-items">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/" onClick={getLoggedOut}>
                Logout
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;

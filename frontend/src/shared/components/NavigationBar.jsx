import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <nav>
      <ul className="list">
        <li>
          <NavLink to="/" exact>
            E-SHOP
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart</NavLink>
        </li>
        <li>
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;

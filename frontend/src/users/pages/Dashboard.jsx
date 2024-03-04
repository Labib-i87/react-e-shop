import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../shared/context/AuthContext";

import "./Dashboard.css";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { userId } = useContext(AuthContext);

  return (
    <div>
      <ul className="dashboard-list">
        <li>
          <Link to="/products/new">Add Product</Link>
        </li>
        <li>
          <Link to={`/${userId}/products`}>My Products</Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;

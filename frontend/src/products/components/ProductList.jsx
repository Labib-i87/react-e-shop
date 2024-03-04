import React from "react";
import ProductItem from "./ProductItem";
import "./ProductList.css";
import { Link } from "react-router-dom";

const ProductList = (props) => {
  return (
    <ul className="product-list">
      {props.items.map((item) => (
        <li key={item._id} className="product-card">
          <Link to={`/products/${item._id}`}>
            <img
              src={`http://localhost:5000/${item.imageUrl}`}
              alt="Product Image"
            />
            <div className="product-content">
              <h4>{item.name}</h4>
              <h5>{item.price}</h5>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;

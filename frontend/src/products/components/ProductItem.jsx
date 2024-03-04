import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import AuthContext from "../../shared/context/AuthContext";
import "./ProductItem.css";

const ProductItem = (props) => {
  const { userId } = useContext(AuthContext);
  const [loadedProduct, setLoadedProduct] = useState();
  const pid = useParams().pid;
  let count = 0;

  const fetchProduct = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:5000/product/${pid}`
      );

      setLoadedProduct(responseData.data.product);
    } catch (err) {
      console.error(err);
    }
  };

  const counter = () => {
    count++;
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {loadedProduct && (
        <main className="main-card-parent">
          <div className="main-card">
            <div className="image">
              <img
                src={`http://localhost:5000/${loadedProduct.imageUrl}`}
                alt="Product Image"
              />
            </div>

            <div className="single-product-content">
              <h1>{loadedProduct.name}</h1>
              <p>{loadedProduct.description}</p>
              <h4>Price: {loadedProduct.price}</h4>
            </div>
          </div>

          {userId == loadedProduct.creator && (
            <div className="product-functions">
              <button className="editButton">EDIT</button>
              <button className="deleteButton">DELETE</button>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default ProductItem;

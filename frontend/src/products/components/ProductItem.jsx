import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import AuthContext from "../../shared/context/AuthContext";
import "./ProductItem.css";
import { useHistory } from "react-router-dom";

const ProductItem = (props) => {
  const { userId } = useContext(AuthContext);
  const [loadedProduct, setLoadedProduct] = useState();
  const pid = useParams().pid;

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

  useEffect(() => {
    fetchProduct();
  }, []);

  const history = useHistory();

  const productDeleteHandler = async () => {
    try {
      const responseData = await axios.delete(
        `http://localhost:5000/product/${pid}`
      );

      history.push(`/${userId}/products`);
    } catch (err) {
      console.error(err);
    }
  };

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
              <Link
                to={`/products/${loadedProduct._id}/edit`}
                className="button editButton"
              >
                EDIT
              </Link>
              <button
                onClick={productDeleteHandler}
                className="button deleteButton"
              >
                DELETE
              </button>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default ProductItem;

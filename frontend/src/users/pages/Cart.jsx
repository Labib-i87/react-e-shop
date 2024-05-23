import axios from "axios";
import React, { useEffect, useState } from "react";
import CartItem from "../../products/components/CartItem";

import "./Cart.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PaymentMethod from "../../shared/components/PaymentMethod";

const Cart = () => {
  const [loadedProducts, setLoadedProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const responseData = await axios.get(`http://localhost:5000/cart/`);

      setLoadedProducts(responseData.data.products);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const cartItemDeleteHandler = async (pid) => {
    const responseData = await axios.delete(
      `http://localhost:5000/cart/${pid}`
    );

    fetchProducts();
  };

  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedProducts.length !== 0 && (
        <main className="cart-page_main">
          <div className="cart-product-list">
            <CartItem items={loadedProducts} onDelete={cartItemDeleteHandler} />
          </div>
          <div className="cart-payment">
            <div className="cart-subtotal">
              <div className="cart-subtotal_content">
                <h3>Subtotal:</h3>
                <h4>
                  {loadedProducts.reduce(
                    (total, item) => total + item.price,
                    0
                  )}
                  /=
                </h4>
              </div>
              {/* <div className="checkout-button">
                <Link>Choose Payment Method</Link>
              </div> */}
            </div>
            <div className="cart-payment_content">
              <PaymentMethod loadedProducts={loadedProducts} />
            </div>
          </div>
        </main>
      )}
      {!isLoading && loadedProducts.length == 0 && (
        <h2 className="center">Cart is empty</h2>
      )}
    </>
  );
};

export default Cart;

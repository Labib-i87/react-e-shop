import React from "react";

import "./CartItem.css";

const CartItem = (props) => {
  return (
    <>
      {props.items.map((item) => (
        <main key={item._id} className="cart-item_main">
          <div className="cart-item_image">
            <img src={`http://localhost:5000/${item.imageUrl}`} alt="image" />
          </div>
          <div className="cart-item_content">
            <h1>{item.name}</h1>
            <h3>Price: {item.price}</h3>
          </div>
          <div className="cart-action">
            <button onClick={() => props.onDelete(item._id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </button>
          </div>
        </main>
      ))}
    </>
  );
};

export default CartItem;

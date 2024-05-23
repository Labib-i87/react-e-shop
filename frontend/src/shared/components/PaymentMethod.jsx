import React, { useState } from "react";
import Input from "../../shared/components/FormElements/Input";

import "./PaymentMethod.css";
import axios from "axios";

const PaymentMethod = (props) => {
  const [formContent, setFormContent] = useState({
    bkash: {
      bkashNumber: "",
      bkashTid: "",
    },
    nagad: {
      nagadNumber: "",
      nagadTid: "",
    },
    rocket: {
      rocketNumber: "",
      rocketTid: "",
    },
  });

  const inputHandler = (id, value) => {
    if (id.includes("bkash")) {
      setFormContent({
        ...formContent,
        bkash: { ...formContent.bkash, [id]: value },
      });
    } else if (id.includes("nagad")) {
      setFormContent({
        ...formContent,
        nagad: { ...formContent.nagad, [id]: value },
      });
    } else if (id.includes("rocket")) {
      setFormContent({
        ...formContent,
        rocket: { ...formContent.rocket, [id]: value },
      });
    }
    // console.log(formContent);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const paymentMethod = event.currentTarget.id;

    const history = {
      date: new Date(),
      products: props.loadedProducts,
      paymentMethod,
      status: "pending",
    };

    await axios.post("http://localhost:5000/purchaseHistory/", history);

    console.log(history);
  };

  return (
    <ul className="accordion">
      {/* {console.log(formContent)} */}
      <li>
        <input type="radio" name="accordion" id="bkash" />
        <label className="accordion-label" htmlFor="bkash">
          Bkash
        </label>
        <div className="content">
          <p>Send Money to +880 1X XXXX XXXX</p>
          <form id="bkash" className="form-elements" onSubmit={submitHandler}>
            <Input
              element="input"
              id="bkashNumber"
              type="number"
              label="Enter Bkash Number"
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="bkashTid"
              type="text"
              label="Enter transaction ID"
              onInput={inputHandler}
            />
            <button className="paymentButton" type="submit">
              Submit
            </button>
          </form>
        </div>
      </li>
      <li>
        <input type="radio" name="accordion" id="nagad" />
        <label className="accordion-label" htmlFor="nagad">
          Nagad
        </label>
        <div className="content">
          <p>Send Money to +880 1X XXXX XXXX</p>
          <form id="nagad" className="form-elements" onSubmit={submitHandler}>
            <Input
              element="input"
              id="nagadNumber"
              type="number"
              label="Enter Nagad Number"
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="nagadTid"
              type="text"
              label="Enter transaction ID"
              onInput={inputHandler}
            />
            <button className="paymentButton" type="submit">
              Submit
            </button>
          </form>
        </div>
      </li>
      <li>
        <input type="radio" name="accordion" id="rocket" />
        <label className="accordion-label" htmlFor="rocket">
          Rocket
        </label>
        <div className="content">
          <p>Send Money to +880 1X XXXX XXXX</p>
          <form id="rocket" className="form-elements" onSubmit={submitHandler}>
            <Input
              element="input"
              id="rocketNumber"
              type="number"
              label="Enter Rocket Number"
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="rocketTid"
              type="text"
              label="Enter transaction ID"
              onInput={inputHandler}
            />
            <button className="paymentButton" type="submit">
              Submit
            </button>
          </form>
        </div>
      </li>
    </ul>
  );
};

export default PaymentMethod;

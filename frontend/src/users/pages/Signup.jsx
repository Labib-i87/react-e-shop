import React, { useContext, useState } from "react";
import axios from "axios";
import Input from "../../shared/components/FormElements/Input";

import "../../shared/components/FormElements/FormStyle.css";
import AuthContext from "../../shared/context/AuthContext";

const Signup = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const [formContent, setFormContent] = useState({
    username: "",
    email: "",
    password: "",
    vPassword: "",
    role: "",
  });

  const inputHandler = (id, value) => {
    setFormContent({ ...formContent, [id]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const { username, email, password, vPassword, role } = formContent;
      const registerData = {
        username,
        email,
        password,
        passwordVerify: vPassword,
        role,
      };

      await axios.post("http://localhost:5000/auth/signup", registerData);
      getLoggedIn();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create a new account</h2>
      <form className="form-elements" onSubmit={submitHandler}>
        <Input
          element="input"
          id="username"
          type="text"
          label="Username"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="email"
          type="email"
          label="E-mail"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="vPassword"
          type="password"
          label="Verify your password"
          onInput={inputHandler}
        />

        <div className="input-elements">
          <label htmlFor="role">Are you a: </label>
          <select
            id="role"
            name="role"
            onChange={(event) => inputHandler("role", event.target.value)}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

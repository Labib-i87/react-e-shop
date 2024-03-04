import React, { useContext, useState } from "react";
import axios from "axios";
import Input from "../../shared/components/FormElements/Input";

import "../../shared/components/FormElements/FormStyle.css";
import AuthContext from "../../shared/context/AuthContext";

const Login = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const [formContent, setFormContent] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (id, value) => {
    setFormContent({ ...formContent, [id]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const { email, password } = formContent;
      const registerData = {
        email,
        password,
      };

      await axios.post("http://localhost:5000/auth/login", registerData);
      getLoggedIn();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Log in to your account</h2>
      <form className="form-elements" onSubmit={submitHandler}>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import "../../shared/components/FormElements/FormStyle.css";
import AuthContext from "../../shared/context/AuthContext";
import Input from "../../shared/components/FormElements/Input";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddProduct = () => {
  // const { getLoggedIn } = useContext(AuthContext);
  const [formContent, setFormContent] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const inputHandler = (id, value) => {
    setFormContent({ ...formContent, [id]: value });
  };

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      console.log(formContent);
      const formData = new FormData();
      formData.append("name", formContent.name);
      formData.append("description", formContent.description);
      formData.append("price", formContent.price);
      formData.append("imageUrl", formContent.imageUrl);
      await axios.post("http://localhost:5000/product/new", formData);
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form className="form-elements" onSubmit={submitHandler}>
        <Input
          element="input"
          id="name"
          type="text"
          label="Name"
          onInput={inputHandler}
        />
        <Input
          element="description"
          id="description"
          type="text"
          label="Description"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="price"
          type="number"
          label="Price (BDT)"
          onInput={inputHandler}
        />
        <Input
          element="file"
          id="imageUrl"
          type="file"
          label="Product Image"
          onInput={inputHandler}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProduct;

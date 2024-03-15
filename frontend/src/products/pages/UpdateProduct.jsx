import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import AuthContext from "../../shared/context/AuthContext";
import axios from "axios";
import Input from "../../shared/components/FormElements/Input";
import { useHistory } from "react-router-dom";

const UpdateProduct = () => {
  const { userId } = useContext(AuthContext);
  const [loadedProduct, setLoadedProduct] = useState();
  const pid = useParams().pid;

  const [formContent, setFormContent] = useState({
    name: "",
    description: "",
    price: "",
  });

  const fetchProduct = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:5000/product/${pid}`
      );

      setLoadedProduct(responseData.data.product);
      formContent.name = responseData.data.product.name;
      formContent.description = responseData.data.product.description;
      formContent.price = responseData.data.product.price;
      formContent.imageUrl = responseData.data.product.imageUrl;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const inputHandler = (id, value) => {
    setFormContent({ ...formContent, [id]: value });
  };

  const history = useHistory();
  const productUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { name, description, price } = formContent;
      const updatedData = {
        name,
        description,
        price,
      };

      await axios.patch(`http://localhost:5000/product/${pid}`, updatedData);
      history.push(`/products/${pid}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {loadedProduct && (
        <main className="main-card-parent">
          <form className="form-elements" onSubmit={productUpdateSubmitHandler}>
            <div className="main-card">
              <div className="image">
                <img
                  src={`http://localhost:5000/${loadedProduct.imageUrl}`}
                  alt="Product Image"
                />
              </div>

              <div className="single-product-content">
                <Input
                  element="input"
                  id="name"
                  type="text"
                  label="Name"
                  onInput={inputHandler}
                  value={formContent.name}
                />
                <Input
                  element="description"
                  id="description"
                  type="text"
                  label="Description"
                  onInput={inputHandler}
                  value={formContent.description}
                />
                <Input
                  element="input"
                  id="price"
                  type="number"
                  label="Price (BDT)"
                  onInput={inputHandler}
                  value={formContent.price}
                />
              </div>
            </div>
            {userId == loadedProduct.creator && (
              <div className="product-functions">
                <Link
                  to={`/products/${loadedProduct._id}`}
                  className="button secondaryButton"
                >
                  CANCEL
                </Link>
                <button type="submit" className="button primaryButton">
                  SAVE
                </button>
              </div>
            )}
          </form>
        </main>
      )}
    </>
  );
};

export default UpdateProduct;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";

const UserProducts = () => {
  const [loadedProducts, setLoadedProducts] = useState();

  const userId = useParams().userId;

  const fetchProducts = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:5000/product/user/${userId}`
      );

      setLoadedProducts(responseData.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return <>{loadedProducts && <ProductList items={loadedProducts} />}</>;
};

export default UserProducts;

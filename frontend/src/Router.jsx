import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthContext from "./shared/context/AuthContext";
import NavigationBar from "./shared/components/NavigationBar";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Cart from "./users/pages/Cart";
import Login from "./users/pages/Login";
import Signup from "./users/pages/Signup";
import Dashboard from "./users/pages/Dashboard";
import AddProduct from "./products/pages/AddProduct";
import UserProducts from "./products/pages/UserProducts";
import ProductItem from "./products/components/ProductItem";
import Products from "./products/pages/Products";
import UpdateProduct from "./products/pages/UpdateProduct";

const Router = () => {
  const { loggedIn, userId, username, role } = useContext(AuthContext);

  let routes;

  if (loggedIn === true) {
    if (role === "seller") {
      routes = (
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/products/new">
            <AddProduct />
          </Route>
          <Route path="/products/:pid/edit">
            <UpdateProduct />
          </Route>
          <Route path="/products/:pid">
            <ProductItem />
          </Route>

          <Route path="/:userId/products">
            <UserProducts />
          </Route>
          {loggedIn !== undefined && <Redirect to="/" />}
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/products/:pid">
            <ProductItem />
          </Route>
          {loggedIn !== undefined && <Redirect to="/" />}
        </Switch>
      );
    }
  } else {
    routes = (
      <Switch>
        <Route exact path="/">
          <div>Homepage</div>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        {loggedIn !== undefined && <Redirect to="/" />}
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <NavigationBar />
      <main className="main">{routes}</main>
    </BrowserRouter>
  );
};

export default Router;

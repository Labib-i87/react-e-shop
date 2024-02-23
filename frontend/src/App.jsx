import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from "./shared/components/NavigationBar";

import Auth from "./users/pages/Auth";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/login">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

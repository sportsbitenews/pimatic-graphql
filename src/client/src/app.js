import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from "react-router-dom";

import { PrivateRoute } from "./auth";
import { LoginPage, AppPage } from "./pages";

export default function AppMain() {
  return (
    <Router>
      <div>
        <Redirect to="/app" />
        <PrivateRoute path="/app" component={AppPage} />
        <Route path="/login" component={LoginPage} />
      </div>
    </Router>
  );
}

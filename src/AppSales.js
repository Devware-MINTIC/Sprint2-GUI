import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Sales from "./views/Sales";
import Products from "./views/Products";
import UserManagement from "./views/UserManagement";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import useAuth from "./hooks/useAuth";

const AppSales = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <BrowserRouter>
        {user && <Navbar />}
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/products" component={Products} />
          <PrivateRoute exact path="/user-management" component={UserManagement} />
          <PrivateRoute exact path="/" component={Sales} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default AppSales;

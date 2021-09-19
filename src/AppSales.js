import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import UserManagement from "./views/UserManagement";

const AppSales = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/user-management" component={UserManagement} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default AppSales;

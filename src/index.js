import React from "react";
import ReactDOM from "react-dom";

import AppSales from "./AppSales";
import { UserProvider } from "./context/UserContext";

import "./index.scss";

ReactDOM.render(
  <UserProvider>
    <AppSales />
  </UserProvider>,
  document.getElementById("root")
);

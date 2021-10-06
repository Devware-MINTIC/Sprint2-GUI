import React, { createContext, useState } from "react";
import { requestToken } from "../services";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [error, setError] = useState(null);

  const contextValue = {
    user,
    error,
    login: async (tokenId) => {
      setError(null);
      await requestToken(tokenId, setUser, setError);
    },
    logout: () => {
      setUser(null);
      setError(null);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
    isLogin: () => !!user,
    isAdmin: () => user?.role === "ADMIN",
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

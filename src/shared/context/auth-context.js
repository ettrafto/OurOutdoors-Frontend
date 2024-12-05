import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  mongoUserId: null, // MongoDB user ID
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [mongoUserId, setMongoUserId] = useState(null);

  const login = (id) => {
    setMongoUserId(id); // Set MongoDB user ID on login
  };

  const logout = () => {
    setMongoUserId(null); // Clear MongoDB user ID on logout
  };

  return (
    <AuthContext.Provider value={{ mongoUserId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

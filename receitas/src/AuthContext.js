import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializa o estado com valor do localStorage, se existir
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem("@isAuthenticated");
    return stored === "true"; // retorna true ou false
  });

  // login salva no localStorage e no estado
  const login = () => {
    localStorage.setItem("@isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  // logout remove o localStorage e atualiza estado
  const logout = () => {
    localStorage.removeItem("@isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

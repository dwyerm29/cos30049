import { createContext, useContext, useState } from "react";
import { Menu, ToRoutes } from "../components/Navbar";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ name: "", isAuthenticated: false });

  const login = (username, password) => {
    // Acting as a fake backend for now

    return new Promise((success, incorrect) => {
      if (password === "password") {
        setUser({ name: username, isAuthenticated: true });
        success("success");
      } else {
        incorrect("Incorrect password  ");
      }
    });
  };
  const logout = () => {
    setUser({ ...user, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        <Menu />
        <ToRoutes />
      </>
    </AuthContext.Provider>
  );
};

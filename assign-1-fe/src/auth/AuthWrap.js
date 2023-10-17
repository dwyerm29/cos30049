import { createContext, useContext, useState } from "react";
import { Menu, ToRoutes } from "../components/Navbar.js";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../store/userSlice.js";

import axios from "axios";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export function AuthWrapper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*   if (localStorage.getItem("user") != null) {
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
  } */
  const user = useSelector((state) => state.user);

  const login = (username, password) => {
    return new Promise((success, incorrect) => {
      axios
        .post("http://127.0.0.1:8000/login", {
          email: username,
          password: password,
        })
        .then((response) => {
          console.log(response);
          if (response.data.length > 0) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...response.data[0],
                isAuthenticated: true,
              })
            );
            dispatch(
              setUser({
                ...response.data[0],
                isAuthenticated: true,
              })
            );
            success("success");
          } else {
            incorrect(
              "Incorrect Password or Email - HINT: try username: john.smith@example.com - password: password"
            );
          }
        })
        .catch((error) => {
          console.error("error here: ", error);
        });
    });
  };

  const logout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        <Menu />
        <ToRoutes />
      </>
    </AuthContext.Provider>
  );
}

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

  if (localStorage.getItem("user").length > 0) {
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
  }
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
                user_id: response.data[0].user_id,
                first_name: response.data[0].first_name,
                last_name: response.data[0].last_name,
                email: response.data[0].email,
                wallet_id: response.data[0].wallet_id,
                isAuthenticated: true,
              })
            );
            dispatch(
              setUser({
                user_id: response.data[0].user_id,
                first_name: response.data[0].first_name,
                last_name: response.data[0].last_name,
                email: response.data[0].email,
                wallet_id: response.data[0].wallet_id,
                isAuthenticated: true,
              })
            );
            success("success");
          } else {
            incorrect("Incorrect password  ");
          }
        })
        .catch((error) => {
          console.error("error here: ", error);
        });
    });
  };

  const logout = () => {
    dispatch(clearUser());
    localStorage.setItem("user", "");
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

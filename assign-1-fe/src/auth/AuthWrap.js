import { createContext, useContext, useState } from "react";
import { Menu, ToRoutes } from "../components/Navbar.js";

import { useDispatch } from "react-redux";
import { setStoreUser } from "../store/userSlice.js";

import axios from "axios";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export function AuthWrapper() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    user_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    isAuthenticated: false,
  });

  const login = (username, password) => {
    // Acting as a fake backend for now

    return new Promise((success, incorrect) => {
      axios
        .post("http://127.0.0.1:8000/login", {
          email: username,
          password: password,
        })
        .then((response) => {
          console.log(response);
          if (response.data.length > 0) {
            setUser({
              user_id: response.data[0].user_id,
              first_name: response.data[0].first_name,
              last_name: response.data[0].last_name,
              email: response.data[0].email,
              isAuthenticated: true,
            });
            localStorage.setItem(
              "user",
              JSON.stringify({
                user_id: response.data[0].user_id,
                first_name: response.data[0].first_name,
                last_name: response.data[0].last_name,
                email: response.data[0].email,
                isAuthenticated: true,
              })
            );
            dispatch(
              setStoreUser({
                user_id: 234,
                first_name: response.data[0].first_name,
                last_name: response.data[0].last_name,
                email: response.data[0].email,
                wallet_id: response.data[0].wallet_id,
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
    setUser({ ...user, isAuthenticated: false });
    localStorage.setItem("user", "");
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

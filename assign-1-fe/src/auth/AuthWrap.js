import { createContext, useContext } from "react";
import { Menu, ToRoutes } from "../components/Navbar.js";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../store/userSlice.js";

import axios from "axios";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export function AuthWrapper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Loads in the user from the Redux store
  const user = useSelector((state) => state.user);

  const login = (username, password) => {
    // axios tries the given login information and returns success, as well as sets the redux store and localstorage user credentials if successful
    return new Promise((success, incorrect) => {
      axios
        .post("http://127.0.0.1:8000/login", {
          email: username,
          password: password,
        })
        .then((response) => {
          //console.log(response);
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

  //clears the user information from the redux store and browser's local storage, navigates back to the home page.
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

import React, { useState } from "react";
import logo from "../images/gwlogo.jpeg";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Route, Routes } from "react-router-dom";
import { AuthData } from "../auth/AuthWrap";
import { navigation } from "./structure/navigation";
import { Input, Button } from "@material-tailwind/react";
import { Box } from "@mui/material";

export const ToRoutes = () => {
  const { user } = AuthData();

  return (
    <Routes>
      {navigation.map((n, i) => {
        if (n.isPrivate && user.isAuthenticated) {
          return <Route key={i} path={n.path} element={n.element} />;
        } else if (!n.isPrivate) {
          return <Route key={i} path={n.path} element={n.element} />;
        } else return false;
      })}
    </Routes>
  );
};
export const Menu = () => {
  const [nav, setNav] = useState(false);
  const hide = () => setNav(false);
  const show = () => setNav(true);
  const { user, logout } = AuthData();

  const MenuItem = ({ n }) => {
    return (
      <Link to={n.path}>
        <Button className="hidden md:flex hover:bg-gray-300  bg-gray-900 px-2">
          {n.name}
        </Button>
      </Link>
    );
  };

  const SmallMenuItem = ({ n }) => {
    return (
      <div className="uppercase p-4">
        <CustomLink
          to={n.path}
          onClick={handleNav}
          onBlur={hide}
          onFocus={show}
        >
          {n.name}
        </CustomLink>
      </div>
    );
  };
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setNav(false)
    );
  }, []);

  const handleNav = () => {
    setNav(!nav);
  };

  let navigate = useNavigate();

  const searchResults = () => {
    navigate("/searchResults");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center h-24 max-width[1240px] m-auto px-4 text-white bg-gray-900">
      <div className="flex items-center md:items-start md:flex-col">
        <Link
          to="/"
          className="flex text-3xl font-bold w-auto mr-2"
          sx={{ ml: 2 }}
        >
          <img src={logo} alt="" className="h-9 w-auto mr-2" />
          <span className="">GlowWave</span>
        </Link>
      </div>
      {/* Search Bar */}
      <Box className="hidden md:flex relative grow " sx={{ mx: 1 }}>
        <Input type="search" label="Type here..." />
        <Button
          size="sm"
          onClick={searchResults}
          className="!absolute right-1 top-1 rounded"
        >
          Search
        </Button>
      </Box>
      {navigation.map((n, i) => {
        if ((!n.isPrivate || user.isAuthenticated) && n.isMenu) {
          return <MenuItem key={i} n={n} />;
        }
      })}

      <div className="hidden md:flex gap-5">
        {user.isAuthenticated ? (
          <Button
            className="hidden md:flex hover:bg-gray-300  bg-gray-900 px-2"
            onClick={logout}
          >
            Log out
          </Button>
        ) : (
          <Button className="hidden md:flex hover:bg-gray-300  bg-gray-900 px-2">
            <Link
              to="/login"
              className="hover:bg-gray-300 active:bg-gray-900 flex gap-1 items-center"
            >
              <AiOutlineUser size={20} className="items-baseline" />
              Login
            </Link>
          </Button>
        )}
      </div>

      <Button className="hidden md:flex gap-5 hover:bg-gray-300 active:bg-gray-900 px-2">
        <Link to="/cart">
          <AiOutlineShoppingCart size={20} />
        </Link>
      </Button>

      {/* Handles smaller screen */}

      <div
        onClick={handleNav}
        className={`fixed top-0 right-0 md:hidden p-2 z-10 ${
          nav ? "fixed top-0 right-0 z-10" : ""
        }`}
      >
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div
        className={
          nav
            ? "fixed z-10 left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-gray-900 ease-in-out duration-500 "
            : "fixed left-[-100%]"
        }
      >
        {/* Search Bar */}
        <Box className=" relative flex grow  " sx={{ m: 1 }}>
          <Input type="search" label="Type here..." />
          <Button
            size="sm"
            onClick={(searchResults, handleNav)}
            className="!absolute right-1 top-1 rounded"
          >
            Search
          </Button>
        </Box>

        {navigation.map((n, i) => {
          if ((!n.isPrivate || user.isAuthenticated) && n.isMenu) {
            return <SmallMenuItem key={i} n={n} />;
          }
        })}
        {/* Login Button */}
        <div className="flex justify-between items-center p-4 md:hidden">
          {user.isAuthenticated ? (
            <div className="uppercase ">
              <CustomLink to="/" onClick={(logout, handleNav)}>
                Log out
              </CustomLink>
            </div>
          ) : (
            <div className="uppercase ">
              <CustomLink to="/login" onClick={handleNav}>
                <AiOutlineUser size={20} />
                <span>Login</span>
              </CustomLink>
            </div>
          )}
        </div>
        <div className="uppercase flex justify-between items-center p-4 md:hidden">
          <CustomLink to="/cart" onClick={handleNav}>
            <AiOutlineShoppingCart size={20} />
            <span>Cart</span>
          </CustomLink>
        </div>
      </div>
    </div>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <ul>
      <li className={isActive === to ? "active list-none" : ""}>
        <Link
          to={to}
          {...props}
          className="hover:bg-gray-300  active:bg-gray-900 border-b border-gray-600 text-decoration:none inline-flex gap-1 list-none"
        >
          {children}
        </Link>
      </li>
    </ul>
  );
}

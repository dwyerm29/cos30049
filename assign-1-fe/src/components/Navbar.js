import React, { useState } from "react";
import logo from "../images/gwlogo.jpeg";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Route, Routes } from "react-router-dom";
import { AuthData } from "../auth/AuthWrap";
import { navigation } from "./structure/navigation";
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
      <div className="hidden md:flex gap-5">
        <Link to={n.path} className="hover:bg-gray-300  active:bg-gray-900">
          {n.name}
        </Link>
      </div>
    );
  };

  const SmallMenuItem = ({ n }) => {
    return (
      <div className="uppercase p-4">
        <CustomLink
          to={n.path}
          onClick={handleNav}
          onBlur={hide}
          OnFocus={show}
          className="hover:bg-gray-300  active:bg-gray-900 border-b border-gray-600 list-none"
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

  return (
    <div className="flex flex-col md:flex-row justify-between items-center h-24 max-width[1240px] m-auto px-4 text-white bg-gray-900">
      <div className="flex items-center md:items-start md:flex-col">
        <Link to="/" className="flex text-3xl font-bold w-auto">
          <img src={logo} alt="" className="h-9 w-auto mr-2" />
          <span className="">GlowWave</span>
        </Link>
      </div>

      {navigation.map((n, i) => {
        if (!n.isPrivate && n.isMenu) {
          return <MenuItem key={i} n={n} />;
        } else if (user.isAuthenticated && n.isMenu) {
          return <MenuItem key={i} n={n} />;
        } else return false;
      })}

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
        {navigation.map((n, i) => {
          if (!n.isPrivate && n.isMenu) {
            return <SmallMenuItem key={i} n={n} />;
          } else if (user.isAuthenticated && n.isMenu) {
            return <SmallMenuItem key={i} n={n} />;
          } else return false;
        })}
      </div>
      <div className="hidden md:flex gap-5">
        {user.isAuthenticated ? (
          <div className="hidden md:flex gap-5">
            <Link to="/login" onClick={logout}>
              Log out
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex gap-5">
            <Link
              to="/login"
              className="hover:bg-gray-300 active:bg-gray-900 inline-flex gap-1"
            >
              <AiOutlineUser size={20} />
              <span>Login</span>
            </Link>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center p-4 md:hidden">
        {user.isAuthenticated ? (
          <div className="uppercase p-4">
            <CustomLink to="/login" onClick={logout}>
              Log out
            </CustomLink>
          </div>
        ) : (
          <div className="uppercase p-4">
            <CustomLink
              to="/login"
              className="hover:bg-gray-300 active:bg-gray-900 inline-flex gap-1 list-none"
            >
              <AiOutlineUser size={20} />
              <span>Login</span>
            </CustomLink>
          </div>
        )}
      </div>
      {nav ? (
        <Link
          to="/cart"
          className="absolute top-8 right-2 z-20 hover:bg-gray-300 active:bg-gray-900"
        >
          <AiOutlineShoppingCart size={20} />
        </Link>
      ) : (
        <div className="hidden md:flex gap-5">
          <Link to="/cart" className="hover:bg-gray-300 active:bg-gray-900">
            <AiOutlineShoppingCart size={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <ul>
      <li className={isActive === to ? "active list-none" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    </ul>
  );
}
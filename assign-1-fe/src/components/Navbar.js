import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Input, Button } from "@material-tailwind/react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="flex justify-between items-center h-24 max-width[1240px] m-auto px-4 text-white bg-gray-900">
      <Link to="/" className="text-3xl font-bold w-auto">
        Site Name
      </Link>
      <div className="relative flex w-full gap-2 md:w-auto">
        <Input
          type="search"
          label="Type here..."
          className="pr-20"
          containerProps={{
            className: "min-w-[140px]",
          }}
        />
        <Button size="sm" className="!absolute right-1 top-1 rounded">
          Search
        </Button>
      </div>
      <ul className="hidden md:flex">
        <CustomeLink
          to="/gallary"
          className="hover:bg-gray-300  active:bg-gray-900 p-4"
        >
          Gallery
        </CustomeLink>
        <CustomeLink
          to="/about"
          className="hover:bg-gray-300  active:bg-gray-900 p-3"
        >
          About
        </CustomeLink>
      </ul>
      {/* Handles smaller screen */}

      <div onClick={handleNav} className="block md:hidden p-4">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-gray-900 ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <Link to="/" className="w-full text-3xl font-bold">
          Site Name
        </Link>
        <ul className="uppercase p-4">
          <CustomeLink
            to="/gallary"
            className="hover:bg-gray-300  active:bg-gray-900 border-b border-gray-600"
          >
            Gallery
          </CustomeLink>
          <CustomeLink
            to="/about"
            className="hover:bg-gray-300  active:bg-gray-900 border-b"
          >
            About
          </CustomeLink>
        </ul>
      </div>
    </div>
  );
}

function CustomeLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive === to ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

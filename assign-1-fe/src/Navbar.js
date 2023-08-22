import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-2 items-stretch bg-zinc-700 text-white">
      <Link to="/" className="text-3xl">
        Site Name
      </Link>
      <ul className="flex gap-5 p-2 m-1">
        <CustomeLink
          to="/gallery"
          className="hover:bg-gray-300  active:bg-gray-900 p-3"
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
    </nav>
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

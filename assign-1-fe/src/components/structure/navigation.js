import { About } from "../../pages/About";
import { Account } from "../../pages/Account";
import { Home } from "../../pages/Home";
import { Login } from "../../pages/Login";
import { FeaturedItems } from "../../pages/FeaturedItems";
import { SearchResults } from "../../pages/SearchResults";
import { Cart } from "../../pages/Cart";
import { Register } from "../../pages/Register";

export const navigation = [
  {
    path: "/",
    element: <Home />,
    isMenu: false,
    isPrivate: false,
  },
  {
    path: "/featureditems",
    name: "Featured",
    element: <FeaturedItems />,
    isMenu: true,
    isPrivate: false,
  },
  {
    path: "/searchresults",
    name: "Search",
    element: <SearchResults />,
    isMenu: true,
    isPrivate: false,
  },
  {
    path: "/about",
    name: "About",
    element: <About />,
    isMenu: true,
    isPrivate: false,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    isMenu: false,
    isPrivate: false,
  },
  {
    path: "/cart",
    name: "Cart",
    element: <Cart />,
    isMenu: false,
    isPrivate: false,
  },
  {
    path: "/register",
    name: "Register",
    element: <Register />,
    isMenu: false,
    isPrivate: false,
  },
  //Only shows when is private is true
  {
    path: "/account",
    name: "Account",
    element: <Account />,
    isMenu: true,
    isPrivate: true,
  },
];

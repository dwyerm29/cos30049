import { About } from "../../pages/About";
import { Account } from "../../pages/Account";
import { Home } from "../../pages/Home";
import { Login } from "../../pages/Login";
import { FeaturedItems } from "../../pages/FeaturedItems";
import { SearchResults } from "../../pages/SearchResults";
import { Cart } from "../../pages/Cart";
import { Register } from "../../pages/Register";
import { ItemDetails } from "../../pages/ItemDetails";
import { Checkout } from "../../pages/Checkout";
import { OrderSummary } from "../../pages/OrderSummary";
import { UploadNFT } from "../../pages/UploadNFT";

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
    path: "/searchresults/",
    name: "Search",
    element: <SearchResults />,
    isMenu: false,
    isPrivate: false,
  },
  {
    path: "/itemdetails/:item_id",
    name: "ItemDetails",
    element: <ItemDetails />,
    isMenu: false,
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
  {
    path: "/checkout",
    name: "Checkout",
    element: <Checkout />,
    isMenu: false,
    isPrivate: false,
  },
  {
    path: "/ordersummary",
    name: "OrderSummary",
    element: <OrderSummary />,
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
  {
    path: "/uploadnft",
    name: "UploadNFT",
    element: <UploadNFT />,
    isMenu: false,
    isPrivate: false,
  },
];

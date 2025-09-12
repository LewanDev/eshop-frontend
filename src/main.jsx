import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartContent from "./components/CartContent/CartContent.jsx";
import App from "./App.jsx";
import ContextProvider from "./context/Context.jsx";

import "./index.css";
import Login from "./components/User/Login.jsx";
import Register from "./components/User/Register.jsx";
import Profile from "./components/User/Profile.jsx";
import Contact from "./components/Contact/Contact.jsx";
import About from "./components/About/About.jsx";
import Products from "./components/Products/Products.jsx";
import Admin from "./components/Admin/Admin.jsx";
import NewItem from "./components/Admin/new-item/NewItem.jsx";
import ImportItems from "./components/Admin/Import-Items/ImportItems.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cart",
    element: <CartContent />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path: "/admin/new-item",
    element: <NewItem />
  },
  {
    path: "/admin/import-items",
    element: <ImportItems />
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);

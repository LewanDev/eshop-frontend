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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);

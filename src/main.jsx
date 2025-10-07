import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartContent from "./components/CartContent/CartContent.jsx";
import App from "./App.jsx";
import ContextProvider, { Context } from "./context/Context.jsx";

import "./index.css";
import Login from "./components/User/Login.jsx";
import Register from "./components/User/Register.jsx";
import Profile from "./components/User/Profile.jsx";
import Contact from "./components/Contact/Contact.jsx";
import About from "./components/About/About.jsx";
import Products from "./components/Products/Products.jsx";
import Admin from "./components/Admin/Admin.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import NotAuthorized from "./components/NotAuthorized.jsx";

import NewItem from "./components/Admin/Item/NewItem.jsx";
import ImportItems from "./components/Admin/Import-Items/ImportItems.jsx";
import NewHeading from "./components/Admin/Heading/NewHeading.jsx";
import { Config } from "./components/Admin/Config/Config.jsx";

function AppRouter() {
  const { user } = useContext(Context);
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
      element: <Products />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/admin/Item",
      element: <NewItem />,
    },
    {
      path: "/admin/import-items",
      element: <ImportItems />,
    },
    {
      path: "/admin/Heading",
      element: <NewHeading />,
    },
    {
      path: "/admin/Config",
      element: <Config />,
    },

    // 🔒 Rutas admin protegidas
    {
      path: "/admin",
      element: (
        <AdminRoute user={user}>
          <Admin />
        </AdminRoute>
      ),
    },
    {
      path: "/admin/item",
      element: (
        <AdminRoute user={user}>
          <NewItem />
        </AdminRoute>
      ),
    },
    {
      path: "/admin/import-items",
      element: (
        <AdminRoute user={user}>
          <ImportItems />
        </AdminRoute>
      ),
    },
    {
      path: "/admin/heading",
      element: (
        <AdminRoute user={user}>
          <NewHeading />
        </AdminRoute>
      ),
    },

    // Página de error
    { path: "/not-authorized", element: <NotAuthorized /> },
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <AppRouter />
    </ContextProvider>
  </StrictMode>
);

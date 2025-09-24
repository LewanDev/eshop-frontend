import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TotalItems from "../CartContent/TotalItems";

import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="sticky top-0 z-10">
      <nav className="flex flex-row justify-between items-center h-[10vh] bg-(--color-darkest) px-5 py-0 relative">
        <Link to="/">
          <img
            src="/logo1.png"
            alt="E-Shop Logo"
            className="h-[75px] w-auto block ml-0.5"
          />
        </Link>

        <Link to="/">
          <span className="text-lighter text-center font-bold m-0 text-3xl">
            e-Shop Deluxe
          </span>
        </Link>

        <div className="flex flex-row justify-between items-center gap-2.5">
          <div className="flex flex-row items-center gap-2.5 mr-2.5">
            {user ? (
              <>
                <div className="dropdown">
                  <img
                    src="/user0.png"
                    alt="Mi perfil"
                    // className="btn-profile"
                    className="border-2 border-solid border-transparent outline-0 text-white bg-transparent font-bold cursor-pointer text-lg w-10 transition-all duration-500"
                  />
                  <div className="dropdown-content">
                    {user.isAdmin ? (
                      <>
                        <Link to="/admin">🔧 Aministrador</Link>
                      </>
                    ) : (
                      <></>
                    )}
                    <Link to="/profile">👤 Mi perfil </Link>
                    <Link to="/cart">
                      🛒 Mi carrito
                      <TotalItems />
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="dropdown">
                <img
                  src="/user0.png"
                  alt="Mi perfil"
                  className="border-2 border-solid border-transparent outline-0 text-white bg-transparent font-bold cursor-pointer text-lg w-10 transition-all duration-500"
                />
                <div className="dropdown-content">
                  <Link to="/login">Iniciar sesión</Link>
                  <Link to="/register">Crear una cuenta</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

/*
const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="nav-container">
      <nav className="navbar">
        <Link to="/">
          <img
            src="/logo1.png"
            alt="E-Shop Logo"
            className="navbar-logo"
          />
        </Link>
        
        <div className="navbar-right">
          <div className="navbar-user">
            {user ? (
              <>
                <>
                  <Link to="/profile">
                    <button className="btn-profile">Mi perfil</button>
                  </Link>
                </>
                <Link to="/cart">
                  <h2 className="navbar-cart">
                    🛒
                    <TotalItems />
                  </h2>
                </Link>
              </>
            ) : (
              <div className="navbar-user-register">
                <Link to="/login">
                  <button className="btn-login">Ingresar</button>
                </Link>
                <Link to="/register">
                  <button className="btn-register">Registrarse</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
*/

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

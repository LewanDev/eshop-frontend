import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

import "./Admin.css";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col flex-1 m-2.5">
        <span className="text-2xl font-bold">Menú de Administrador</span>
        <div className="flex flex-row gap-2.5 mt-5">
          <Link to="/admin/new-item">
            <span className="border-0 outline-0 text-(--color-lighter) py-2.5 px-5 bg-(--color-secondary) cursor-pointer text-lg rounded-xl transition-all duration-500 hover:bg-(--color-secondary-dark)">
              ABM de Artículos
            </span>
          </Link>
          <Link to="/admin/import-items">
            <span className="border-0 outline-0 text-(--color-lighter) py-2.5 px-5 bg-(--color-secondary) cursor-pointer text-lg rounded-xl transition-all duration-500 hover:bg-(--color-secondary-dark)">
              Importar artículos
            </span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;

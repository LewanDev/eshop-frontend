import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-6 m-auto">
        <span className="text-2xl font-bold">Menú de Administrador</span>
        <div className="flex flex-row gap-5">
          <Link to="/admin/new-item" className="btn-secondary">
            <span>ABM de Artículos</span>
          </Link>
          <Link to="/admin/import-items" className="btn-secondary">
            <span>Importar artículos</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;

import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col gap-5 p-6 m-auto">
        <span className="text-3xl font-bold">Menú de Administrador</span>
        <div className="flex flex-col gap-5">
          <Link to="/admin/Item" className="btn-secondary">
            <span>ABM de Artículos</span>
          </Link>
          {/* 
          <Link to="/admin/Import-Items" className="btn-secondary">
            <span>Importar artículos</span>
          </Link>
          
          <Link to="/admin/Heading" className="btn-secondary">
            <span>ABM de Rubros</span>
          </Link> 
          */}
          <Link to="/admin/Orders" className="btn-secondary">
            <span>Listado de pedidos</span>
          </Link>
          {/* 
          <Link to="/admin/Config" className="btn-green">
            <span>Configuración</span>
          </Link> 
          */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;

import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import Title from "../Misc/Title";
import Navbar from "../NavBar/Navbar";
import Products from "../Products/Products";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Title >Nuestros productos</Title>
      <div className="product-card-container">
        <Products />
      </div>
      <Footer />
    </>
  );
};

export default Home;

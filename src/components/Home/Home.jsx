import Banner from "../Banner/Banner";
import Navbar from "../NavBar/Navbar";
import Products from "../Products/Products";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <div className="product-card-container">
        <Products />
      </div>
    </>
  );
};

export default Home;

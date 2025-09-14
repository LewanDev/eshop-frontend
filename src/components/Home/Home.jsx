import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import Navbar from "../NavBar/Navbar";
import RandomProducts from "../Products/RandomProducts";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <RandomProducts />
      <Footer />
    </>
  );
};

export default Home;

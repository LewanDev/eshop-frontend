import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Banner.css";

/* BANNER AUTOMATICO
import { useState, useEffect } from "react";

import banner1 from "../assets/images/banner1.jpg";
import banner2 from "../assets/images/banner2.jpg";
import banner3 from "../assets/images/banner3.jpg";

const images = [
  { src: banner1, text: "E-Shop Demo - Calidad garantizada" },
  { src: banner2, text: "Ofertas únicas cada semana" },
  { src: banner3, text: "Compra fácil y rápido" }
];
const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // cambia cada 5 seg
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${images[current].src})` }}
    >
      <div className="banner-container">
        <h1>E-Shop Demo</h1>
        <p>{images[current].text}</p>
      </div>
    </div>
  );
};

export default Banner;
*/

const Banner = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      loop={true}
      className="banner-swiper"
    >
      <SwiperSlide>
        <div
          // className="banner-slide"
          className="h-full bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/images/banner1.jpg')" }}
        >
          {/* 
          <div className="banner-container">
            <h1>Super Sale</h1>
            <p>Descuentos de hasta el 50% en productos seleccionados</p> 
          </div>
          */}
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="h-full bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/images/banner2.jpg')" }}
        >
          {/* 
          <div className="banner-container">
            <h1>Día de la Madre</h1>
            <p>¡Aprovechá ahora los descuentos exclusivos antes de que nos quedemos sin stock!</p>
          </div>
          */}
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="h-full bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/images/banner3.jpg')" }}
        >
          {/*
          <div className="banner-container">
             <h1>Envíos a todo el país</h1>
            <p>Comprá desde tu casa y te lo llevamos a tu puerta.</p> 
          </div>
          */}
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;

import { Link } from "react-router-dom";
import shoe from './assets/shoe.png'
import jacket from "./assets/jacket.png"
import parfume from "./assets/parfume.png"

const HeroSection = () => {
  return (
    <section className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      {/* Fejléc */}
      <header className="absolute top-6 left-6 right-6 flex justify-between items-center text-sm font-medium tracking-wide">
        <span className="text-2xl font-bold">LUX</span>
        <nav className="space-x-6">
          <a href="#" className="hover:underline">Főoldal</a>
          <a href="#products" className="hover:underline">Termékek</a>
          <a href="#about" className="hover:underline">Rólunk</a>
          <a href="#contact" className="hover:underline">Kapcsolat</a>
        </nav>
      </header>

      {/* Szöveg */}
      <div className="text-center mt-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Prémium utcai ruházat<br />és illatok
        </h1>
        <p className="mt-4 text-gray-300 text-lg sm:text-xl">
          Fedezd fel a legújabb márkás divatot és illatokat.
        </p>
        <Link
          to="/visitor"
          className="inline-block mt-8 px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition rounded-md text-sm font-semibold"
        >
          Vásárolj most
        </Link>
      </div>

      {/* Termékek képe */}
      <div className="flex items-end justify-center gap-8 mt-20 md:mt-28">
        <img
          src={shoe}
          alt="Sneaker"
          className="w-28 sm:w-36 md:w-44 opacity-90"
        />
        <img
          src={jacket}
          alt="Kabát"
          className="w-28 sm:w-36 md:w-44 opacity-90"
        />
        <img
          src={parfume}
          alt="Parfüm"
          className="w-20 sm:w-28 md:w-32 opacity-90"
        />
      </div>
    </section>
  );
};

export default HeroSection;
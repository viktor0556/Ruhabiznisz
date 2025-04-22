import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center shadow">
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-gray-300"
      >
        LUX
      </Link>
      <nav className="space-x-6 text-sm font-medium">
        <Link to="/about" className="hover:text-gray-400">
          Rólunk
        </Link>
        <Link to="/contact" className="hover:text-gray-400">
          Kapcsolat
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;

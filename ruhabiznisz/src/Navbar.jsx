// src/Navbar.jsx
import { Link } from "react-router-dom";
import { useAdmin } from "./AdminContext";

const Navbar = () => {
  const { isAdmin } = useAdmin();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Főoldal</Link>
        <Link to="/visitor" className="hover:underline">Látogatói nézet</Link>
        {isAdmin && <Link to="/addProduct" className="hover:underline">Admin oldal</Link>}
      </div>
      <div>
        <Link to="/login" className="hover:underline">Admin belépés</Link>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import { useAdmin } from "./AdminContext";

const Navbar = () => {
  const { isAdmin } = useAdmin();

  return (
    <div className="w-full bg-white px-6 py-3 flex items-center justify-between text-sm text-gray-700 border-b">
      {/* Bal oldal – logó */}
      <div className="text-xl font-semibold tracking-wide">
        <Link to="/">LUX</Link>
      </div>

      {/* Jobb oldal – menüpontok */}
      <div className="space-x-6">
        <Link to="/visitor" className="hover:underline">Termékek</Link>
        {isAdmin && (
          <Link to="/addProduct" className="hover:underline">Admin</Link>
        )}
        <Link to="/login" className="hover:underline">Bejelentkezés</Link>
      </div>
    </div>
  );
};

export default Navbar;

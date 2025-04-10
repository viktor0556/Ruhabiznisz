import { useAdmin } from "./AdminContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { isAdmin } = useAdmin();

  return (
    <div>
      {isAdmin ? (
        <>
          <Link to="/addProduct">Termék hozzáadása</Link>
          {/* További admin menüpontok */}
        </>
      ) : (
        <>
          <p>Látogatóként nézed az oldalt.</p>
          {/* Látogatói menüpontok */}
        </>
      )}
      <Link to="/login">
        <button>Admin belépés</button>
      </Link>
    </div>
  );
};

export default Home;

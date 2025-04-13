import { useAdmin } from "./AdminContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { isAdmin } = useAdmin();

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Üdvözöllet</h1>
      {isAdmin ? (
        <p className="text-green-600">Be vagy jelentkezve adminként.</p>
      ) : (
        <p className="text-gray-600">Látogatóként nézed az oldalt.</p>
      )}
    </div>
  );
};

export default Home;

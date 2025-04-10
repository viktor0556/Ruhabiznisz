import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "./AdminContext";

const password = import.meta.env.VITE_ADMIN_PASSWORD;

const Login = () => {
  const { isAdmin, setIsAdmin } = useAdmin();
  const [checkPassword, setCheckPassword] = useState("");

  const login = () => {
    if (checkPassword === password) {
      setIsAdmin(true);
    } else {
      alert("Hibás jelszó");
    }
  };

  if (isAdmin) {
    return <Navigate to="/addProduct" />;
  }

  return (
    <div>
      <label>
        Jelszó:
        <input
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
        />
      </label>
      <button onClick={login}>Belépés</button>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "./AdminContext";

const password = import.meta.env.VITE_ADMIN_PASSWORD;

const Login = () => {
  const { isAdmin, loginAsAdmin } = useAdmin();
  const [checkPassword, setCheckPassword] = useState("");

  const login = () => {
    if (checkPassword === password) {
      loginAsAdmin();
    } else {
      alert("Hibás jelszó");
    }
  };

  if (isAdmin) {
    return <Navigate to="/addProduct" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10 space-y-4">
      <label className="text-lg">
        Jelszó:
        <input
          type="password"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
          className="ml-2 border px-2 py-1 rounded"
        />
      </label>
      <button
        onClick={login}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Belépés
      </button>
    </div>
  );
  
};

export default Login;

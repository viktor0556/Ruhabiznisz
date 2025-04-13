import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const loginAsAdmin = () => {
    localStorage.setItem("isAdmin", "true");
    setIsAdmin(true);
  };

  const logoutAsAdmin = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, loginAsAdmin, logoutAsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

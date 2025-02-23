import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAdmin(!!token); // Set isAdmin to true if token exists
  }, []);

  // ✅ Add a login function
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAdmin(true);
  };

  // ✅ Add a logout function
  const logout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

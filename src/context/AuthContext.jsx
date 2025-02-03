import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Create Auth Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true"; // Check if admin session exists
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isAdmin", isAdmin); // Store admin status in localStorage
  }, [isAdmin]);

  const login = (username, password) => {
    if (username === "admin" && password === "password") {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true"); // Persist login state
      navigate("/incoming"); // Redirect to Incoming page after login
    } else {
      alert("Invalid credentials!");
    }
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin"); // Clear admin session
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes Validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

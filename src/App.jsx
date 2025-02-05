import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Incoming from "./pages/Incoming";
import Outgoing from "./pages/Outgoing";
import Admin from "./pages/Admin";
import AdminDashBoard from "./pages/Dashboard"
import { useAuth } from "./context/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/incoming"
          element={
            <ProtectedRoute>
              <Incoming />
            </ProtectedRoute>
          }
        />
        <Route
          path="/outgoing"
          element={
            <ProtectedRoute>
              <Outgoing />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
      </Routes>
    </div>
  );
}

export default App;

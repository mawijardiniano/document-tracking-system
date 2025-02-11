import { Routes, Route, Navigate } from "react-router-dom";
import Incoming from "./pages/admin/Incoming";
import Outgoing from "./pages/admin/Outgoing";
import Admin from "./pages/admin/Admin";
import AdminDashBoard from "./pages/admin/Dashboard";

import { useAuth } from "./context/AuthContext";
import PropTypes from "prop-types";
import Scanned from "./pages/admin/scanned";

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
      <Routes>
        <Route path="/admin/incoming" element={<Incoming />} />
        <Route path="/admin/outgoing" element={<Outgoing />} />
        <Route path="/admin/Scanned" element={<Scanned />} />
        <Route path="/" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
      </Routes>
    </div>
  );
}

export default App;

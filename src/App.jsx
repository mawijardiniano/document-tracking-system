import { Routes, Route, Navigate } from "react-router-dom";
import Incoming from "./pages/admin/Incoming";
import Outgoing from "./pages/admin/Outgoing";
import Admin from "./pages/admin/Admin";
import AdminDashBoard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/settings/Settings";
import AddAgency from "./pages/admin/settings/addAgency";
import AddReceiver from "./pages/admin/settings/addReceiver"
import { useAuth } from "./context/AuthContext";
import PropTypes from "prop-types";
import AddDocuments from "./pages/admin/addDocuments";
import Regional from "./pages/admin/regional";

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
      <Route path="/" element={<Admin />} />
        <Route path="/admin/incoming" element={<Incoming />} />
        <Route path="/admin/outgoing" element={<Outgoing />} />
        <Route path="/admin/regional" element={<Regional />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/settings/add-agency" element={<AddAgency />} />
        <Route path="/admin/settings/add-receiver" element={<AddReceiver />} />
        <Route path="/admin/add" element={<AddDocuments />} />
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"; // ✅ Corrected import path
import Incoming from "./pages/Incoming"; // ✅ Corrected import path
import Outgoing from "./pages/Outgoing"; 
import { useAuth } from "./context/AuthContext";
import PropTypes from "prop-types"; // Import PropTypes

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/" />;
};


// Add PropTypes validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/incoming" element={<ProtectedRoute><Incoming /></ProtectedRoute>} />
        <Route path="/outgoing" element={<ProtectedRoute><Outgoing /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;

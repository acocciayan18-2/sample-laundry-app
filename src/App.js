// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import NewOrder from "./pages/NewOrder";
import SignUp from "./pages/SignUp";
import AppLayout from "./AppLayout";
import { AuthProvider } from "./security/AuthContext";
import ProtectedRoute from "./security/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes (no layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes (with layout + sidebar) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/new-order" element={<NewOrder />} /> {/* ✅ NewOrder */}
              <Route path="/orders" element={<Orders />} />
            </Route>
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

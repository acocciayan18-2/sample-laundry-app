import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./security/AuthContext";
import ProtectedRoute from "./security/ProtectedRoute";
import SignUp from "./pages/SignUp";
import MainApp from "./pages/MainApp";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";
import Customers from "./pages/Customers";
import Services from "./pages/Services";
import NewOrder from "./pages/NewOrder";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes (with sidebar layout) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<MainApp />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="reports" element={<Reports />} />
              <Route path="customers" element={<Customers />} />
              <Route path="services" element={<Services />} />
              <Route path="neworder" element={<NewOrder />} />
            </Route>
          </Route>

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

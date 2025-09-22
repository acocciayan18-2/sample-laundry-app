import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./AppLayout";
import { AuthProvider } from "./security/AuthContext";
import ProtectedRoute from "./security/ProtectedRoute";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes (NO AppLayout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes (with layout) */}
          <Route element={<ProtectedRoute />}>
            
              <Route path="/dashboard" element={<Dashboard />} />
           
          </Route>

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

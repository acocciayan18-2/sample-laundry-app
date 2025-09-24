// src/AppLayout.js
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { LoginPopup } from "./modal/LoginPopup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./services/firebase";
import "./style/dashboard.css"; // sidebar + layout styles

export default function AppLayout() {
  const [popup, setPopup] = useState({ message: "", type: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 3000);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User session restored:", user.email);
      } else {
        console.log("No active session");
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="logo">
          <img src="/images/laundrylogo.jpg" alt="LaundryPro Logo" />
          <h5>Fe's Laundry</h5>
          <small>Laundry Shop Manager</small>
        </div>

        <nav>
          <h6>Main Menu</h6>
          <ul>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="fas fa-home"></i> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/new-order" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="fas fa-plus"></i> New Order
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="fas fa-clipboard-list"></i> Orders
              </NavLink>
            </li>
            <li>
              <NavLink to="/customers" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="fas fa-users"></i> Customers
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="fas fa-cog"></i> Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="fas fa-chart-bar"></i> Reports
              </NavLink>
            </li>
            <li>
              <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          </ul>
        </nav>

        <div className="quick-info">
          <div className="info green">
            <i className="fas fa-clipboard-list"></i> Today's Orders <strong>0</strong>
          </div>
          <div className="info orange">
            <i className="fas fa-check-circle"></i> Ready for Pickup <strong>0</strong>
          </div>
        </div>

        <footer>
          <strong>LS</strong> Laundry Shop <br /> Manage daily operations
        </footer>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="main-content">
        {/* Burger toggle (mobile only, shown via CSS) */}
        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <i className="fas fa-bars"></i>
        </button>

        <Outlet context={{ showPopup }} />
      </main>

      <LoginPopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </div>
  );
}

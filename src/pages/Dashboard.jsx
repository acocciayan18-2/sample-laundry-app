import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase"; // make sure you have firebase.js file setup
import "../style/dashboard.css";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      await signOut(auth); // 🔹 Firebase clears session automatically
      navigate("/login"); // redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="dashboard-container bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* Main Content */}
      <main className="main-content">
        {/* Burger Button (only visible on mobile via CSS) */}
        <button className="menu-toggle" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>

        <header>
          <h2>Good Evening!</h2>
          <p>Welcome back to your laundry shop dashboard</p>
          <small>Sunday, September 14th, 2025</small>

          <div className="header-buttons">
            <button className="btn-primary">
              <i className="fas fa-plus"></i> New Order
            </button>
            <button className="btn-outline">
              <i className="fas fa-users"></i> Customers
            </button>
          </div>
        </header>

        <section className="stats-cards">
          <div className="card">
            <div className="icon green">
              <i className="fas fa-chart-line"></i>
            </div>
            <div>
              <h4>₱0.00</h4>
              <small>Today's Revenue</small>
            </div>
          </div>

          <div className="card">
            <div className="icon orange">
              <i className="fas fa-clock"></i>
            </div>
            <div>
              <h4>1</h4>
              <small>Pending</small>
            </div>
          </div>

          <div className="card">
            <div className="icon blue">
              <i className="fas fa-check-circle"></i>
            </div>
            <div>
              <h4>2</h4>
              <small>Ready</small>
            </div>
          </div>

          <div className="card">
            <div className="icon purple">
              <i className="fas fa-box"></i>
            </div>
            <div>
              <h4>0</h4>
              <small>In Progress</small>
            </div>
          </div>
        </section>

        <section className="orders">
          <h5>
            <i className="fas fa-clipboard-list"></i> Today's Orders (0)
          </h5>
          <div className="empty">
            <i className="fas fa-tshirt fa-3x"></i>
            <p>No orders created today yet</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;


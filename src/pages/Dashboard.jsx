// src/pages/Dashboard.jsx
import React from "react";
import "../style/dashboard.css";

function Dashboard() {
  return (
    <>
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

      {/* Stats Cards */}
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

      {/* Today's Orders (Dashboard summary box) */}
      <section className="orders">
        <h5>
          <i className="fas fa-clipboard-list"></i> Today's Orders (0)
        </h5>
        <div className="empty">
          <i className="fas fa-tshirt fa-3x"></i>
          <p>No orders created today yet</p>
        </div>
      </section>
    </>
  );
}

export default Dashboard;

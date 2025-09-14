import React, { useState } from "react";
import "../style/dashboard.css"

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div
        className={`bg-white border-end p-3 ${sidebarOpen ? "d-block" : "d-none d-md-block"}`}
        style={{ width: "220px" }}
      >
        <button
          className="btn btn-sm btn-outline-secondary mb-3 d-md-none"
          onClick={() => setSidebarOpen(false)}
        >
          ←
        </button>

        <div className="text-center mb-4">
          <img
            src="/images/logo.png"
            alt="LaundryPro Logo"
            className="rounded-circle border mb-2"
            width="80"
          />
          <h5 className="fw-bold">Fe's Laundry</h5>
          <small className="text-muted">Laundry Shop Manager</small>
        </div>

        <h6 className="text-uppercase text-muted small">Main Menu</h6>
        <ul className="nav flex-column mb-4">
          <li className="nav-item">
            <a href="#" className="nav-link active text-white bg-primary rounded">
              Dashboard
            </a>
          </li>
          <li><a href="#" className="nav-link">+ New Order</a></li>
          <li><a href="#" className="nav-link">Orders</a></li>
          <li><a href="#" className="nav-link">Customers</a></li>
          <li><a href="#" className="nav-link">Services</a></li>
          <li><a href="#" className="nav-link">Reports</a></li>
        </ul>

        <h6 className="text-uppercase text-muted small">Quick Info</h6>
        <div className="mb-2 p-2 bg-light rounded">
          Today's Orders <span className="fw-bold">0</span>
        </div>
        <div className="mb-4 p-2 bg-light rounded">
          Ready for Pickup <span className="fw-bold">0</span>
        </div>

        <footer className="text-center small text-muted">
          <strong>LS</strong> Laundry Shop <br />
          Manage daily operations
        </footer>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4 bg-light overflow-auto">
        {/* Sidebar toggle for mobile */}
        <button
          className="btn btn-sm btn-outline-secondary mb-3 d-md-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "←" : "→"}
        </button>

        <header className="mb-4">
          <h2 className="text-primary fw-bold">Good Evening!</h2>
          <p>Welcome back to your laundry shop dashboard</p>
          <small className="text-primary fw-semibold">
            Sunday, September 14th, 2025
          </small>

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-primary">+ New Order</button>
            <button className="btn btn-outline-primary">👥 Customers</button>
          </div>
        </header>

        {/* Stats cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card text-white bg-primary shadow-sm p-3">
              <h4>₱0.00</h4>
              <small>Today's Revenue</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-warning shadow-sm p-3">
              <h4>1</h4>
              <small>Pending</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-success shadow-sm p-3">
              <h4>2</h4>
              <small>Ready</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-purple shadow-sm p-3" style={{background:"#6f42c1"}}>
              <h4>0</h4>
              <small>In Progress</small>
            </div>
          </div>
        </div>

        {/* Orders section */}
        <div className="card shadow-sm p-4">
          <h5 className="text-primary mb-3">📅 Today's Orders (0)</h5>
          <div className="text-center text-muted">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1040/1040254.png"
              alt="No orders"
              width="50"
              className="mb-2 opacity-50"
            />
            <p>No orders created today yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// src/pages/Orders.jsx
import React, { useState } from "react";
import "../style/orders.css";
import { useNavigate } from "react-router-dom";

const sampleOrders = [
  {
    id: "LO20250918341",
    customer: "Ayan",
    phone: "09948415027",
    address: "Block 1 Lot 18 Katwiran St. Ibayo Tipas Taguig City",
    weight: "8kg",
    services: [{ name: "Regular Wash & Dry", qty: "8kg", rate: "₱25/kg" }],
    status: "Pending",
    amount: 200,
    paid: false,
    date: "Sep 18, 11:42 AM",
  },
  {
    id: "LO20250918156",
    customer: "Maria",
    phone: "09123456789",
    address: "Block 5 Lot 7 Main Road, Taguig City",
    weight: "5kg",
    services: [{ name: "Express Wash", qty: "5kg", rate: "₱40/kg" }],
    status: "Picked Up",
    amount: 200,
    paid: true,
    date: "Sep 17, 4:20 PM",
  },
];

function Orders() {
  const [filter, setFilter] = useState("All Orders");
  const navigate = useNavigate();

  const filters = [
    { name: "All Orders", icon: "fas fa-list" },
    { name: "Pending", icon: "fas fa-clock" },
    { name: "In Progress", icon: "fas fa-box" },
    { name: "Ready", icon: "fas fa-check" },
    { name: "Picked Up", icon: "fas fa-truck" },
  ];

  const filteredOrders =
    filter === "All Orders"
      ? sampleOrders
      : sampleOrders.filter((o) => o.status === filter);

  return (
    <div className="orders-page">
      {/* Page header */}
      <div className="orders-header">
        <div>
          <h2>All Orders</h2>
          <p>Manage and track laundry orders</p>
        </div>

       <button
  className="btn-primary header-btn"
  onClick={() => navigate("/new-order")}
>
  <span className="plus-icon">+</span>
  <span>New Order</span>
</button>
      </div>

      {/* Search + Filters */}
      <div className="orders-toolbar">
        <input
          type="text"
          placeholder="Search by customer name, phone, or order number..."
          className="search-bar"
        />
        <div className="filters">
          {filters.map((f) => (
            <button
              key={f.name}
              onClick={() => setFilter(f.name)}
              className={`filter-btn ${filter === f.name ? "active" : ""}`}
            >
              <i className={f.icon}></i> {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <section className="orders-list">
        {filteredOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              {/* Left: avatar + name + status */}
              <div className="order-left">
                <div className="avatar">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h3>{order.customer}</h3>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Right: amount + status */}
              <div className="order-right">
                <h4>₱{order.amount}.00</h4>
                <span className={order.paid ? "paid" : "unpaid"}>
                  {order.paid ? "Paid" : "Unpaid"}
                </span>
                <small>{order.date}</small>
              </div>
            </div>

            {/* Order Info */}
            <div className="order-info">
              <p>
                <strong>Order:</strong>{" "}
                <span className="order-id">{order.id}</span>
              </p>
              <p>📞 {order.phone}</p>
              <p>📍 {order.address}</p>
              <p>
                Weight: {order.weight} | Services: {order.services.length}
              </p>
            </div>

            <hr />

            {/* Services */}
            <div className="order-services">
              <strong>Service Details:</strong>
              <div className="service-box">
                {order.services.map((s, idx) => (
                  <p key={idx}>
                    {s.name} — {s.qty} @ {s.rate}
                  </p>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="order-actions">
              <button className="btn-primary">Next Stage</button>
              <button className="btn-outline">Update Status</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Orders;

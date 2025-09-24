// src/pages/Orders.jsx
import React, { useState } from "react";
import "../style/orders.css";

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
  const filters = ["All Orders", "Pending", "In Progress", "Ready", "Picked Up"];

  const filteredOrders =
    filter === "All Orders"
      ? sampleOrders
      : sampleOrders.filter((o) => o.status === filter);

  return (
    <>
      <header>
        <h2>Orders</h2>
        <p>Manage and track laundry orders</p>
        <small>Total Orders: {filteredOrders.length}</small>
      </header>

      {/* Filters */}
      <div className="filters">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? "active" : ""}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <section className="orders-list">
        {filteredOrders.length === 0 ? (
          <div className="empty">
            <i className="fas fa-tshirt fa-3x"></i>
            <p>No orders found for this filter</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>
                  {order.customer}{" "}
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </h3>
                <p className="order-id">Order: {order.id}</p>
              </div>

              <div className="order-details">
                <p>📞 {order.phone}</p>
                <p>📍 {order.address}</p>
                <p>Weight: {order.weight}</p>
                <p>Date: {order.date}</p>
                <p>Amount: ₱{order.amount}.00</p>
                <p>{order.paid ? "✅ Paid" : "❌ Unpaid"}</p>
              </div>

              <div className="service-details">
                <strong>Services:</strong>
                {order.services.map((s, idx) => (
                  <p key={idx}>
                    {s.name} – {s.qty} @ {s.rate}
                  </p>
                ))}
              </div>

              <div className="actions">
                <button className="btn-primary">Next Stage</button>
                <button className="btn-outline">Update Status</button>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}

export default Orders;

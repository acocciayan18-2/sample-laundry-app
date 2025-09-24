// src/pages/NewOrder.jsx
import React, { useState } from "react";
import "../style/neworder.css"; // we'll create this file

function NewOrder() {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);

  const serviceOptions = [
    { name: "Regular Wash & Dry", price: 25 },
    { name: "Wash, Dry & Fold", price: 35 },
    { name: "Premium Wash, Dry & Press", price: 45 },
  ];

  const addService = (service, weight) => {
    if (!weight || weight <= 0) return;
    const subtotal = service.price * weight;

    const newService = {
      ...service,
      weight,
      subtotal,
    };

    setServices([...services, newService]);
    setTotal(total + subtotal);
  };

  const createOrder = () => {
    if (!customer.name || !customer.phone || services.length === 0) {
      alert("Please fill customer details and add services.");
      return;
    }
    alert("✅ Order Created Successfully!");
    // send data to backend here
  };

  return (
    <div className="neworder-page">
      {/* Header */}
      <header className="neworder-header">
        <div>
          <h2>New Order</h2>
          <p>Create and manage a new laundry order</p>
        </div>
      </header>

      <div className="neworder-layout">
        {/* Customer Info */}
        <section className="neworder-card">
          <h3>👤 Customer Information</h3>
          <div className="form-group">
            <label>Customer Name *</label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              placeholder="Enter full name"
            />
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="text"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
              placeholder="Enter phone number"
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              value={customer.address}
              onChange={(e) =>
                setCustomer({ ...customer, address: e.target.value })
              }
              placeholder="Enter address"
            />
          </div>
        </section>

        {/* Services */}
        <section className="neworder-card">
          <h3>📦 Services</h3>
          {serviceOptions.map((service, index) => (
            <div key={index} className="service-row">
              <div>
                <h4>{service.name}</h4>
                <small>₱{service.price}/kg</small>
              </div>
              <div className="service-actions">
                <input
                  type="number"
                  placeholder="Kg"
                  id={`weight-${index}`}
                />
                <button
                  className="btn-primary"
                  onClick={() => {
                    const weight = document.getElementById(
                      `weight-${index}`
                    ).value;
                    addService(service, parseFloat(weight));
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Summary */}
        <aside className="neworder-card summary">
          <h3>📋 Order Summary</h3>
          <p>
            <strong>Customer:</strong> {customer.name || "No name"} <br />
            {customer.phone || "No phone"} <br />
            {customer.address || ""}
          </p>

          <div>
            <strong>Services ({services.length}):</strong>
            {services.length === 0 ? (
              <p>No services added</p>
            ) : (
              <ul>
                {services.map((s, i) => (
                  <li key={i}>
                    {s.weight}kg {s.name} — ₱{s.subtotal}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p>
            <strong>Total: ₱{total}</strong>
          </p>

          <div className="form-group">
            <label>Special Instructions</label>
            <textarea rows="2" placeholder="Add notes..."></textarea>
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select>
              <option>Cash</option>
              <option>GCash</option>
              <option>Card</option>
            </select>
          </div>

          <button className="btn-primary w-100" onClick={createOrder}>
            Create Order
          </button>
        </aside>
      </div>
    </div>
  );
}

export default NewOrder;

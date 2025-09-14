import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function NewOrder() {
  // State for customer info
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // State for services
  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);

  // Available services
  const serviceOptions = [
    { name: "Regular Wash & Dry", price: 25 },
    { name: "Wash, Dry & Fold", price: 35 },
    { name: "Premium Wash, Dry & Press", price: 45 },
  ];

  // Handle adding service
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

  // Handle order creation
  const createOrder = () => {
    if (!customer.name || !customer.phone || services.length === 0) {
      alert("Please fill customer details and add services.");
      return;
    }
    alert("✅ Order Created Successfully!");
    // Here you can send data to Firebase / backend
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <aside className="bg-white border-end p-3" style={{ width: "250px" }}>
        <div className="text-center mb-4">
          <img
            src="/images/logo.png"
            alt="LaundryPro Logo"
            className="img-fluid mb-2"
            style={{ maxWidth: "80px" }}
          />
          <h5>Fe's Laundry</h5>
          <p className="text-muted">Laundry Shop Manager</p>
        </div>

        <nav>
          <h6>Main Menu</h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a href="#" className="nav-link">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link active fw-bold">
                + New Order
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Orders
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Customers
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Reports
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        <header className="mb-4">
          <h1 className="h3">New Order</h1>
          <p className="text-muted">Create a new laundry order</p>
        </header>

        <div className="row g-4">
          {/* Left Column */}
          <section className="col-md-7">
            <div className="card mb-4">
              <div className="card-body">
                <h5>👤 Customer Information</h5>
                <div className="mb-3">
                  <label className="form-label">Customer Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customer.name}
                    onChange={(e) =>
                      setCustomer({ ...customer, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customer.address}
                    onChange={(e) =>
                      setCustomer({ ...customer, address: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="card">
              <div className="card-body">
                <h5>📦 Services</h5>
                {serviceOptions.map((service, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center border p-2 rounded mb-2"
                  >
                    <div>
                      <h6 className="mb-0">{service.name}</h6>
                      <small>₱{service.price}/kg</small>
                    </div>
                    <div className="d-flex">
                      <input
                        type="number"
                        className="form-control form-control-sm me-2"
                        placeholder="Kg"
                        id={`weight-${index}`}
                      />
                      <button
                        className="btn btn-success btn-sm"
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
              </div>
            </div>
          </section>

          {/* Right Column */}
          <aside className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h5>📋 Order Summary</h5>
                <div className="mb-3">
                  <strong>Customer</strong>
                  <br />
                  {customer.name || "No name"} <br />
                  {customer.phone || "No phone"} <br />
                  {customer.address || ""}
                </div>

                <ul className="list-unstyled mb-3">
                  <strong>Services ({services.length})</strong>
                  {services.length === 0 ? (
                    <p>No services selected</p>
                  ) : (
                    services.map((s, i) => (
                      <li key={i}>
                        {s.weight}kg {s.name} — ₱{s.subtotal}
                      </li>
                    ))
                  )}
                </ul>

                <p>
                  <strong>Total: ₱{total}</strong>
                </p>

                <div className="mb-3">
                  <label className="form-label">Special Instructions</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Add notes..."
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <select className="form-select">
                    <option>Cash</option>
                    <option>GCash</option>
                    <option>Card</option>
                  </select>
                </div>

                <button
                  className="btn btn-primary w-100"
                  onClick={createOrder}
                >
                  Create Order
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default NewOrder;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: validate credentials here
    navigate("/dashboard"); // ⬅️ navigate to Dashboard.js
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
        {/* Logo */}
        <div className="text-center mb-3">
          <img
            src="/images/logo.png"
            alt="LaundryPro PH Logo"
            className="img-fluid"
            style={{ maxWidth: "150px" }}
          />
        </div>

        {/* Title */}
        <h3 className="text-center fw-bold">Welcome to Lola Fe's Laundry PH</h3>
        <p className="text-center text-muted mb-4">Sign in to continue</p>

        {/* Google Login */}
        <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center mb-3">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Logo"
            style={{ width: "20px", marginRight: "10px" }}
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted">OR</span>
          <hr className="flex-grow-1" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input type="email" id="email" className="form-control" placeholder="you@example.com" required />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input type="password" id="password" className="form-control" placeholder="********" required />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Sign in
          </button>
        </form>

        {/* Footer Divider */}
        <hr className="my-4" />

        {/* Footer Links */}
        <div className="d-flex justify-content-between">
          <a href="#" className="text-decoration-none">Forgot password?</a>
          <a href="#" className="text-decoration-none">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;

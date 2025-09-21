import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: validate credentials here
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="card">
        {/* Logo */}
        <div className="text-center mb-3">
          <img
            src="/images/laundrylogo.jpg"
            alt="Lola Fe's Laundry PH Logo"
            className="img-fluid"
          />
        </div>

        {/* Title */}
        <h3 className="text-center">Welcome to Lola Fe's Laundry PH</h3>
        <p className="text-center">Sign in to continue</p>

        {/* Google Login */}
        <button className="btn-google">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Logo"
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="d-flex align-items-center">
          <hr className="divider flex-grow-1" />
          <span className="divider-text">OR</span>
          <hr className="divider flex-grow-1" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" className="form-control" placeholder="you@example.com" required />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" className="form-control" placeholder="********" required />
          </div>

          <button type="submit" className="btn-primary">
            Sign in
          </button>
        </form>

        {/* Footer Links */}
        <div className="footer-links mt-4">
          <a href="#">Forgot password?</a>
          <a href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;

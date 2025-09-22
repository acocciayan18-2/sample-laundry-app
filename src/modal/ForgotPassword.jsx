import React from "react";
import "../style/modal-style/ForgotPassword.css";

export default function ForgotPassword({
  resetEmail,
  setResetEmail,
  resetLoading,
  handleForgotPassword,
  setShowForgotPopup,
}) {
  return (
   <div className="popup-backdrop">
  <div className="popup-box position-relative"> {/* Add position-relative for absolute positioning */}
    
    {/* Close button with 'X' icon moved to the top right corner */}
    <button
      onClick={() => {
        setShowForgotPopup(false);
        setResetEmail("");
      }}
      className="btn-close"
      aria-label="Close"
      style={{ position: 'absolute', top: '10px', right: '10px' }}
    >
      <span aria-hidden="true">&times;</span>
    </button>

    <h4>Reset Password</h4>
    
    {/* Use flexbox to keep the SVG aligned to the left for multi-line text */}
    <p className="small text-muted d-flex align-items-baseline">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle me-2 flex-shrink-0" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
      </svg>
      Only fully registered admin accounts will receive a password reset link.
    </p>

    <div className="mb-3 text-start">
      <label htmlFor="email" className="form-label">
        Email
      </label>
      <div className="inputForm mb-2 text-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.4rem"
          height="1.4rem"
          fill="currentColor"
          className="bi bi-at"
          viewBox="0 0 16 16"
        >
          <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914" />
        </svg>
        <input
          type="email"
          className="input"
          id="email"
          placeholder="Enter your Email"
          required
          autoComplete="off"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
        />
      </div>

      {/* 🔹 Error / success message directly below input */}
      {/* ... (error message remains the same) */}
      
    </div>

    <div className="d-flex justify-content-between">
      <button
        onClick={handleForgotPassword}
        className="btn-primary"
        disabled={resetLoading}
      >
        {resetLoading ? "Sending..." : "Send Reset Link"}
      </button>
    </div>
  </div>
</div>
  );
}

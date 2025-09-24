import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/login.css";
import { auth } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
   sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { LoginPopup } from "../modal/LoginPopup";
import ForgotPassword from "../modal/ForgotPassword";

function Login() {
  const navigate = useNavigate();

  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // "success" or "error"
  const [showPassword, setShowPassword] = useState(false); // 🔹 Toggle password
  const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");

   const [showForgotPopup, setShowForgotPopup] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState(""); // 🔹 add this

  const showPopup = (msg, type) => {
    setPopupMessage(msg);
    setPopupType(type);
    setTimeout(() => setPopupMessage(""), 3000);
  };



const handleForgotPassword = async () => {
  if (!resetEmail.trim()) {
    showPopup("Please enter your email.", "error");
    return;
  }

  try {
    setResetLoading(true);

    await sendPasswordResetEmail(auth, resetEmail);

    showPopup("Reset link sent! Check your email.", "success");
    setShowForgotPopup(false); // optional: close popup after success
    setResetEmail("");
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      showPopup("❌ This email is not registered.", "error");
    } else {
      showPopup("❌ " + error.message, "error");
    }
  } finally {
    setResetLoading(false);
  }
};


  // 🔹 Email/Password login
 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    await setPersistence(auth, browserLocalPersistence);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    const user = userCredential.user;

    if (!user.emailVerified) {
      showPopup("Please verify your email before logging in.", "error");
      await auth.signOut();
      return;
    }

    localStorage.setItem(
      "session",
      JSON.stringify({ email: loginEmail, timestamp: Date.now() })
    );

    showPopup("Login successful!", "success");
    setTimeout(() => navigate("/main"), 1000);
  } catch (error) {
    console.error(error);
    showPopup("Invalid email or password.", "error");
    setLoginPassword(""); // clear password
  }
};


  return (
    <div className="login-container">
      <LoginPopup
        message={popupMessage}
        type={popupType}
        onClose={() => setPopupMessage("")}
      />

      <div className="card">
        <div className="text-center mb-3">
          <img src="/images/laundrylogo.jpg" alt="Logo" className="img-fluid" />
        </div>

        <h3 className="text-center">Welcome to Lola Fe's Laundry PH</h3>
        <p className="text-center">Log in to continue</p>

        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">
              Email
            </label>

            <div class="inputForm mb-3 text-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4rem"
                height="1.4rem"
                fill="currentColor"
                class="bi bi-at"
                viewBox="0 0 16 16"
              >
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914" />
              </svg>
              <input
                type="email"
                className="input"
                id="login-email"
                placeholder="Enter your Email"
                required
                autoComplete="off"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="inputForm pwd-login-con">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3rem"
                height="1.3rem"
                fill="currentColor"
                class="bi bi-lock"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
                />
              </svg>
              <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  className="input"
                  placeholder="********"
                  required
                  autoComplete="off"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />

              <button
                type="button"
                className="pwd-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-eye-slash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-eye"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                  </svg>
                )}
              </button>
            </div>

            {/* Forgot Password button (right aligned) */}
            <div className="text-end mt-2">
              <button  onClick={() => setShowForgotPopup(true)} type="button" className="btn-link" style={{ border: "none", background: "none", color: "#0d6efd", cursor: "pointer" }}>
                Forgot Password?
              </button>
            </div>

            {showForgotPopup && (
             <ForgotPassword
              resetEmail={resetEmail}
              setResetEmail={setResetEmail}
              resetLoading={resetLoading}
              handleForgotPassword={handleForgotPassword}
              setShowForgotPopup={setShowForgotPopup}
              errorMessage={resetError} // 🔹 pass error state
            />
              )}

          </div>

          <button type="submit" className="btn-primary">
            Log in
          </button>
        </form>

        <div className="footer-links mt-4 d-flex gap-3">
          <p className="text-body">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    
      {/* 🔹 Forgot Password Popup */}
      
    </div>
  );
}

export default Login;

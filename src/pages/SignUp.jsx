import { getDatabase, ref, get } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../services/firebase";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginPopup } from "../modal/LoginPopup";
import "../style/signup.css";

export default function SignUp() {
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [popup, setPopup] = useState({ message: "", type: "info" });
  const [showPassword, setShowPassword] = useState(false); // 🔹 Toggle password

  const [password, setPassword] = useState("");
  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const closePopup = () => setPopup({ message: "", type: "info" });

  // 🔹 Fetch admin email from Realtime DB
  const fetchAdminEmail = async () => {
    const db = getDatabase();
    const otpEmailRef = ref(db, "admin_information/admin_email_otp");
    const snapshot = await get(otpEmailRef);
    if (snapshot.exists()) return snapshot.val();
    throw new Error("Admin OTP email not found in database.");
  };

  // 🔹 Send OTP using EmailJS
  const sendOtpToAdminEmail = async () => {
    try {
      const adminEmail = await fetchAdminEmail();
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);

      await emailjs.send(
        "service_161dqwv",
        "template_1ijquaz",
        { email: adminEmail, otp },
        "evCxW5Fmv_kR4q8gh"
      );

      setOtpSent(true);
      setPopup({ message: "OTP sent to admin email.", type: "success" });
    } catch (err) {
      console.error(err);
      setPopup({
        message: "Failed to send OTP: " + err.message,
        type: "error",
      });
    }
  };

  // 🔹 Handle password change and check criteria
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setCriteria({
      length: value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      number: /\d/.test(value),
      special: /[!@#$%^&*()_,.?":{}|<>]/.test(value),
    });
  };

  const isPasswordValid = Object.values(criteria).every(Boolean);

  // 🔹 Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    try {
      // Check if email already exists
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setPopup({
          message: "Email is already registered. Please log in.",
          type: "error",
        });
        return;
      }

      // Send OTP only if not sent
      if (!otpSent) {
        await sendOtpToAdminEmail();
        return;
      }

      // Validate OTP
      if (enteredOtp !== generatedOtp) {
        setPopup({ message: "Invalid OTP. Please try again.", type: "error" });
        return;
      }

      // Create the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 🔹 Send verification link
      await sendEmailVerification(userCredential.user);

      setPopup({
        message:
          "Signup successful! Please check your email to verify your account before logging in.",
        type: "success",
      });

      // Reset state
      e.target.email.value = "";
      setPassword("");
      setOtpSent(false);
      setEnteredOtp("");
    } catch (error) {
      console.error(error);
      setPopup({ message: "Signup failed: " + error.message, type: "error" });
    }
  };

  // Replace your checkIcon with this:
  const checkIcon = (met) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      viewBox="0 0 16 16"
      className={met ? "text-green" : "text-red-500"}
      fill={met ? "#22c55e" : "#ef4444"}
    >
      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
    </svg>
  );

  return (
    <div className="signup-container ">
      <LoginPopup
        message={popup.message}
        type={popup.type}
        onClose={closePopup}
      />

      <div className="signup-card">
        <div className="flex justify-center items-center w-full">
          <div className="mb-3 flex justify-center items-center w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl  overflow-hidden">
            <img
              src="/images/lolafeslaundry-logo-transparent.png"
              alt="Logo"
              className="max-w-full max-h-full"
            />
          </div>
        </div>
        <h3 className="text-center text-3xl font-extrabold text-gray-800 mb-1">Create Admin Account</h3>
        <p className="text-center">Sign up with a secure password and OTP verification.</p>

        <form onSubmit={handleSignup}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">
              Admin Email
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
                class="input"
                id="email"
                placeholder="Enter your Email"
                required
                autocomplete="off"
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
                id="password"
                className="input"
                placeholder="Enter your password"
                required
                autocomplete="off"
                value={password}
                onChange={handlePasswordChange}
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
          </div>

          <div className="mb-3 text-start" style={{ position: "relative" }}>
            {password && (
              <ul className="mt-1 list-none p-0">
                <li
                  className={`flex items-center gap-1 text-sm ${
                    criteria.length ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {checkIcon(criteria.length)} At least 6 characters
                </li>
                <li
                  className={`flex items-center gap-1 text-sm ${
                    criteria.uppercase ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {checkIcon(criteria.uppercase)} At least 1 uppercase letter
                </li>
                <li
                  className={`flex items-center gap-1 text-sm ${
                    criteria.number ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {checkIcon(criteria.number)} At least 1 number
                </li>
                <li
                  className={`flex items-center gap-1 text-sm ${
                    criteria.special ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {checkIcon(criteria.special)} At least 1 special character
                </li>
              </ul>
            )}
          </div>
          {otpSent && (
            <div className="mb-3 text-start">
              <label htmlFor="otp" className="form-label">
                Enter OTP sent to your email
              </label>
              <input
                type="text"
                id="otp"
                className="form-control"
                placeholder="6-digit OTP"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-4 py-2 rounded shadow cursor-pointer"
            disabled={!isPasswordValid}
          >
            {otpSent ? "Complete Signup" : "Send OTP"}
          </button>
        </form>

        <div className="text-left mt-3">
          <p className="text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-sm"
              style={{
                border: "none",
                background: "none",
                color: "#0d6efd",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

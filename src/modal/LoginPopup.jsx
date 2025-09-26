// src/components/ui/UI.js
import React, { useEffect, useState } from "react";
import "../style/modal-style/LoginPopup.css";

export function LoginPopup({ message, type = "info", onClose }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (message) {
      setProgress(100);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            onClose();
            return 0;
          }
          return prev - 2.5;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [message, onClose]);

  if (!message) return null;

  const color = type === "success" ? "green" : "red";

  const icon =
    type === "success" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill={color}
        className="me-2"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill={color}
        className="me-2"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 0 0 8 0a8 8 0 0 0 0 16" />
        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
      </svg>
    );

  return (
    <div
      className="position-fixed top-0 start-50 translate-middle-x mt-3 flex-row login-popup-con"
      style={{ zIndex: 9999999 }}
    >
      <div
        className="toast show bg-white shadow-sm border-1 rounded overflow-hidden position-relative"
        role="alert"
        style={{ borderColor: color }}
      >
        {/* Close Button */}
        <p
          className="position-absolute top-0 end-0 m-1 login-btn-close-popup focus-ring-0"
          aria-label="Close"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.7rem"
            height="1.7rem"
            fill={color}
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </p>

        {/* Message with Icon */}
        <div className="toast-body d-flex align-items-center justify-content-center login-pop-up-icon">
          {icon}
          <span style={{ color }} className="text-base pr-2">{message}</span>
        </div>

        {/* Progress Bar */}
        <div
          className="progress-bar"
          style={{
            height: "2px",
            background: "none",
            backgroundColor: color,
            width: `${progress}%`,
            transition: "width 40ms linear",
          }}
        ></div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

const Toast = ({ message, type = "success", onClose, duration = 5000 }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgColor =
    type === "success"
      ? "linear-gradient(135deg, #28a745, #3cd26b)"
      : "linear-gradient(135deg, #dc3545, #ff5c5c)";

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: bgColor,
        color: "#fff",
        padding: "14px 24px",
        borderRadius: "999px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        zIndex: 9999,
        fontWeight: "600",
        fontSize: "16px",
        backdropFilter: "blur(6px)",
        animation: "fadeInScale 0.4s ease, fadeOut 0.4s ease 2.6s forwards",
        textAlign: "center",
        minWidth: "200px",
      }}
    >
      {message}
      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: translate(-50%, -20px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -20px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;

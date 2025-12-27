import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CheckCircle } from "lucide-react";

export const OrderConfirmation = () => {
  useEffect(() => {
    // simple confetti
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  // inline styles to avoid Tailwind issues
  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ffffff 0%, #fef3f2 100%)",
    padding: "24px",
    textAlign: "center",
    position: "relative",
  };

  const buttonWrapperStyle = {
    marginTop: "32px",
  };

  const buttonStyle = {
    background: "linear-gradient(90deg, #ff5c8a 0%, #ff9966 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "9999px",
    padding: "14px 36px",
    fontWeight: 600,
    fontSize: "15px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(255, 92, 138, 0.35)",
  };

  return (
    <div style={pageStyle}>
      {/* icon circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{
          width: 70,
          height: 70,
          borderRadius: "9999px",
          background: "#fff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <CheckCircle size={38} color="#ff5c8a" strokeWidth={2.5} />
      </motion.div>

      <h1 style={{ fontSize: "22px", fontWeight: 700, marginBottom: 10 }}>
        Order Confirmed!
      </h1>
      <p style={{ maxWidth: 500, lineHeight: 1.6, color: "#414141" }}>
        Thank you for shopping with us 💖 Your order is on its way!
        <br />
        Sit back, relax, and let the happiness find you soon ✨
      </p>

      <div style={buttonWrapperStyle}>
        <motion.button
          style={buttonStyle}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => (window.location.href = "/shop")}
        >
          Continue Shopping
          <span role="img" aria-label="bag">
            🛍️
          </span>
        </motion.button>
      </div>
    </div>
  );
};

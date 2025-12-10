import React from "react";

/**
 * Floating WhatsApp bubble.
 * Props:
 * - phone: string (e.g. "919876543210")
 * - message?: string
 * - position?: "left" | "right" (default "left")
 * - offsetX?: number (px)
 * - offsetY?: number (px)
 * - label?: string small text badge
 * - showLabel?: boolean
 * - zIndex?: number (default 9999)
 */
const FloatingWhatsApp = ({
  phone,
  message = "Hi! I’d like to know more.",
  position = "left",
  offsetX = 16,
  offsetY = 16,
  label = "WhatsApp",
  showLabel = false,
  zIndex = 9999,
}) => {
  const baseUrl = "https://wa.me/";
  const href = `${baseUrl}${phone}?text=${encodeURIComponent(message)}`;

  const sideStyle =
    position === "left"
      ? { left: `${offsetX}px` }
      : { right: `${offsetX}px` };

  return (
    <a
      aria-label="Chat on WhatsApp"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: `${offsetY}px`,
        ...sideStyle,
        zIndex,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        textDecoration: "none",
      }}
    >
      {/* bubble */}
      <span
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 30%, #25d366 0%, #1faa52 60%, #128C7E 100%)",
          boxShadow: "0 8px 24px rgba(0,0,0,.18)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform .15s ease",
        }}
        className="wa-bubble"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 32 32"
          fill="#fff"
          aria-hidden="true"
        >
          <path d="M19.1 17.4c-.3-.1-1-.5-1.1-.6-.2-.1-.4-.1-.6.1s-.7.8-.9 1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.8-1.6-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.2.2 2.2 3.3 5.2 4.5.7.3 1.2.5 1.6.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.5.2-1.6 0-.1-.2-.1-.5-.2z" />
          <path d="M26.9 5.1C24.6 2.8 21.4 1.5 18 1.5 9.9 1.5 3.4 8 3.4 16.1c0 2.6.7 5.1 2.1 7.3L3 30.5l7.4-2.4c2.1 1.1 4.4 1.7 6.7 1.7 8.1 0 14.6-6.6 14.6-14.6 0-3.4-1.3-6.6-3.6-8.9zm-8.9 22.7c-2.2 0-4.3-.6-6.2-1.8l-.4-.2-4.4 1.5 1.5-4.3-.3-.4c-1.3-1.9-2-4.1-2-6.3C6.2 9 11.5 3.7 18 3.7c3.1 0 6 1.2 8.2 3.4s3.4 5.1 3.4 8.2c0 6.5-5.3 11.8-11.6 11.8z" />
        </svg>
      </span>

      {/* tiny badge text (optional) */}
      {showLabel && (
        <span
          style={{
            background: "#111",
            color: "#fff",
            padding: "8px 10px",
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(0,0,0,.18)",
            userSelect: "none",
          }}
        >
          {label}
        </span>
      )}
    </a>
  );
};

export default FloatingWhatsApp;

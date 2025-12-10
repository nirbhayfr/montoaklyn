import React, { useEffect, useMemo, useState } from "react";

/**
 * Bottom sticky CTA bar.
 * Shows after scroll (configurable). Put WhatsApp zIndex higher (9999).
 */
const StickyOrderBar = ({
  href = "/checkout",
  onClick,
  ctaText = "Order Now – Cash on Delivery",
  subText = "15 days money back guarantee",
  bg = "#78C043",
  textColor = "#ffffff",
  zIndex = 9998,
  showOnScroll = true,
  minScrollPx = 120,
  stickyOnMobileOnly = false,
}) => {
  const [visible, setVisible] = useState(!showOnScroll);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (!showOnScroll) return;
    const onScroll = () => setVisible((window.scrollY || 0) > minScrollPx);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showOnScroll, minScrollPx]);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  }, []);

  if (closed) return null;
  if (stickyOnMobileOnly && !isMobile) return null;
  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Order now"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex,
        background: bg,
        color: textColor,
        boxShadow: "0 -8px 24px rgba(0,0,0,.12)",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: 1100,
          padding: "10px 12px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span aria-hidden="true" style={{ display: "inline-flex" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6h15l-1.5 8.5a2 2 0 0 1-2 1.7H9.2a2 2 0 0 1-2-1.6L5 3H2"
              stroke={textColor}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="20" r="1.6" fill={textColor} />
            <circle cx="18" cy="20" r="1.6" fill={textColor} />
          </svg>
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          <strong style={{ fontSize: 16, lineHeight: 1.1 }}>{ctaText}</strong>
          <span style={{ fontSize: 12, opacity: 0.95 }}>{subText}</span>
        </div>

        {/* {href && !onClick ? (
          <a
            href={href}
            style={{
              textDecoration: "none",
              background: "#111",
              color: "#fff",
              fontWeight: 700,
              padding: "10px 14px",
              borderRadius: 8,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "nowrap",
            }}
          >
            Order Now
          </a>
        ) : (
          <button
            onClick={onClick}
            style={{
              background: "#111",
              color: "#fff",
              fontWeight: 700,
              padding: "10px 14px",
              borderRadius: 8,
              border: 0,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Order Now
          </button>
        )} */}

         {/* close button
        <button
          onClick={() => setClosed(true)}
          aria-label="Hide order bar"
          style={{
            marginLeft: 6,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,.2)",
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          title="Close"
        >
          ✕
        </button> */}

        
      </div>
    </div>
  );
};

export default StickyOrderBar;

import { FaWhatsapp } from "react-icons/fa";
import React from 'react'
const FloatingIcons = () => {
  return (
    <>
      {/* WhatsApp Floating Icon */}
      <a
        href="https://wa.me/7500773292"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "95px",      // ⬅️ shows ABOVE chat widget
          right: "20px",
          background: "#25D366",
          color: "#fff",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <FaWhatsapp size={28} />
      </a>
    </>
  );
};

export default FloatingIcons;

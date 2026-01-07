import { FaWhatsapp } from "react-icons/fa";
import React from "react";

const FloatingIcons = () => {
  return (
    <a
      href="https://wa.me/917500773292?text=Hi"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "95px",
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
  );
};

export default FloatingIcons;

import React, { useState, useEffect } from "react";

const TypingDots = () => {
  const [dots, setDots] = useState(".");
  const [direction, setDirection] = useState("forward"); // forward or backward

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (direction === "forward") {
          if (prev.length >= 4) {
            setDirection("backward");
            return prev.slice(0, -1);
          }
          return prev + ".";
        } else {
          if (prev.length <= 1) {
            setDirection("forward");
            return prev + ".";
          }
          return prev.slice(0, -1);
        }
      });
    }, 300); // Adjust speed as desired

    return () => clearInterval(interval);
  }, [direction]);

  return <span>{dots}</span>;
};

export default TypingDots;

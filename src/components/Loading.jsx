import React, { useEffect, useState } from "react";
import "./Loading.css";

export default function Loading({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 🔒 Disable scroll
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
      // 🔓 Enable scroll again
      document.body.style.overflow = "auto";
    }, 1000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-9999">
          <div className="snake-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      )}

      <div
        className={`transition-opacity duration-700 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import "./Loading.css";

export default function Loading({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
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
        className={`${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-700`}
      >
        {children}
      </div>
    </div>
  );
}

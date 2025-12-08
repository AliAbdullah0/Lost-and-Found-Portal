// components/CursorBlobBackground.tsx
"use client";

import { useEffect, useRef } from "react";

export default function CursorBlobBackground() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!blobRef.current) return;

      const { clientX, clientY } = e;

      // Smooth follow with slight delay (feels organic)
      blobRef.current.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: "forwards" }
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={blobRef}
        className="pointer-events-none fixed inset-0 -z-10 opacity-70"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-500/30 via-pink-400/25 to-cyan-500/30 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-t from-blue-500/20 to-purple-400/30 blur-3xl animate-pulse" />
      </div>

      {/* Optional subtle grain */}
      <div className="pointer-events-none fixed inset-0 -z-10 mix-blend-soft-light opacity-30">
        <div className="h-full w-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.15%22/%3E%3C/svg%3E')] dark:invert" />
      </div>
    </>
  );
}
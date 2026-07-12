"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function MenuDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          color: "#0F1B47",
          opacity: 0.7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Hamburger */}
        <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="18" height="1.5" rx="0.75" fill="currentColor" />
          <rect y="5.75" width="18" height="1.5" rx="0.75" fill="currentColor" />
          <rect y="11.5" width="18" height="1.5" rx="0.75" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <nav
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "rgba(247, 241, 226, 0.97)",
            WebkitBackdropFilter: "blur(8px)",
            backdropFilter: "blur(8px)",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(15,27,71,0.08), 0 8px 32px rgba(15,27,71,0.14)",
            padding: "6px 0",
            minWidth: "152px",
            zIndex: 50,
          }}
        >
          <Link
            href="/itinerary"
            onClick={() => setOpen(false)}
            className="font-sans"
            style={{
              display: "block",
              padding: "10px 20px",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0F1B47",
              textDecoration: "none",
            }}
          >
            Itinerary
          </Link>
          <Link
            href="/travel"
            onClick={() => setOpen(false)}
            className="font-sans"
            style={{
              display: "block",
              padding: "10px 20px",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0F1B47",
              textDecoration: "none",
            }}
          >
            Travel
          </Link>
          {/* ACCOMMODATION — slot here when ready */}
        </nav>
      )}
    </div>
  );
}

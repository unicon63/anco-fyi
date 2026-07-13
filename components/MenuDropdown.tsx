"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const MENU_ITEMS = [
  { label: "Accommodation", href: "/accommodation" },
  { label: "Itinerary", href: "/itinerary" },
  { label: "Travel", href: "/travel" },
] as const;

// Line geometry (closed hamburger)
const LINE_WIDTH = 18;
const LINE_HEIGHT = 1.5;
const LINE_TOPS = [0, 7.25, 14.5];
const CLOSED_HEIGHT = 16;

// Label geometry (open state)
const LABEL_TOPS = [0, 24, 48];
const OPEN_HEIGHT = 62;

export default function MenuDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
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
      <div
        style={{
          position: "relative",
          height: open ? `${OPEN_HEIGHT}px` : `${CLOSED_HEIGHT}px`,
          transition: "height 250ms ease-out",
        }}
      >
        {/* Hamburger lines — fade out on open, fade in on close */}
        {LINE_TOPS.map((top, i) => (
          <div
            key={`line-${i}`}
            style={{
              position: "absolute",
              right: 0,
              top: `${top}px`,
              width: `${LINE_WIDTH}px`,
              height: `${LINE_HEIGHT}px`,
              borderRadius: "0.75px",
              backgroundColor: "#0F1B47",
              opacity: open ? 0 : 0.7,
              transition: open
                ? "opacity 150ms ease-out"
                : "opacity 150ms ease-out 150ms",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Labels — persistent elements that transition between positions.
            Closed: sit at hamburger line positions, invisible.
            Open: fall to their final label positions, visible.
            Using <a> + onClick for navigation so we keep a single persistent
            DOM node per item (Link would remount on open/close). */}
        <nav
          aria-label="Site menu"
          style={{ display: open ? "block" : "none" }}
        >
          {/* Semantic nav Links — only present when open for accessibility */}
        </nav>
        {MENU_ITEMS.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              router.push(item.href);
            }}
            className="font-sans"
            role="menuitem"
            tabIndex={open ? 0 : -1}
            style={{
              position: "absolute",
              right: 0,
              top: open ? `${LABEL_TOPS[i]}px` : `${LINE_TOPS[i]}px`,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0F1B47",
              textDecoration: "none",
              whiteSpace: "nowrap",
              lineHeight: "14px",
              display: "block",
              opacity: open ? 0.7 : 0,
              pointerEvents: open ? "auto" : "none",
              transition: open
                ? "opacity 250ms ease-out 100ms, top 250ms ease-out 100ms"
                : "opacity 250ms ease-in, top 250ms ease-in",
            }}
          >
            {item.label}
          </a>
        ))}

        {/* Button overlay — covers hamburger zone when closed */}
        <button
          onClick={() => { if (!open) setOpen(true); }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          style={{
            position: "absolute",
            top: "-14px",
            right: "-14px",
            width: "44px",
            height: "44px",
            background: "none",
            border: "none",
            cursor: open ? "default" : "pointer",
            zIndex: 2,
            padding: 0,
            pointerEvents: open ? "none" : "auto",
          }}
        />
      </div>
    </div>
  );
}

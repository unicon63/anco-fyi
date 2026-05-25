"use client";

import React, { useState } from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "hero" | "form" | "outline" | "secondary";
  className?: string;
  loading?: boolean;
}

export default function PrimaryButton({
  children,
  onClick,
  disabled = false,
  type = "button",
  variant = "form",
  className = "",
  loading = false,
}: PrimaryButtonProps) {
  const [pressed, setPressed] = useState(false);

  const isHero = variant === "hero";
  const isOutline = variant === "outline";

  const scale = disabled || loading
    ? "scale-100"
    : pressed
    ? isHero
      ? "scale-[0.98]"
      : "scale-[0.99]"
    : "scale-100";

  const baseClasses = `
    inline-flex items-center justify-center
    border-none rounded-[999px]
    font-sans text-[13px] font-semibold tracking-[0.22em] uppercase
    transition-transform duration-150 ease-out
    select-none
    ${scale}
  `;

  let stateClasses = "";

  if (isOutline) {
    stateClasses = `
      bg-transparent text-[#0F1B47]
      border border-[rgba(15,27,71,0.25)]
      px-4 py-[16px]
      text-[11px]
    `;
  } else if (disabled || loading) {
    stateClasses = `
      bg-[rgba(15,27,71,0.25)] text-[rgba(247,241,226,0.7)]
      shadow-[0_1px_2px_rgba(15,27,71,0.08)]
      cursor-not-allowed
      ${isHero ? "px-9 py-[18px] min-w-[150px]" : "px-9 py-[18px] min-w-[150px]"}
    `;
  } else {
    stateClasses = `
      bg-[#09144C] text-[#F7F1E2]
      shadow-[0_2px_6px_rgba(15,27,71,0.18),0_18px_36px_rgba(15,27,71,0.22)]
      cursor-pointer
      ${isHero ? "px-9 py-[18px] min-w-[150px]" : "px-9 py-[18px] min-w-[150px]"}
    `;
  }

  return (
    <button
      type={type}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      className={`${baseClasses} ${stateClasses} ${className}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {loading ? (
        <span className="flex items-center gap-2 opacity-70">
          <svg
            width="14"
            height="14"
            viewBox="0 0 28 28"
            fill="none"
            className="animate-spin-slow"
          >
            <circle
              cx="14"
              cy="14"
              r="11"
              stroke="#F7F1E2"
              strokeWidth="2.5"
              strokeDasharray="28"
              strokeDashoffset="18"
              strokeLinecap="round"
            />
          </svg>
          Sending…
        </span>
      ) : (
        children
      )}
    </button>
  );
}

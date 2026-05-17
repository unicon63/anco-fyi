"use client";

import { useState } from "react";

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}

export default function AddressInput({
  value,
  onChange,
  placeholder,
  autoComplete,
  className = "",
}: AddressInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`rounded-[12px] font-sans text-[16px] font-normal placeholder:opacity-40 ${className}`}
      style={{
        background: "rgba(247, 241, 226, 0.72)",
        border: "none",
        padding: "14px 16px",
        color: "#0F1B47",
        WebkitBackdropFilter: "blur(4px)",
        backdropFilter: "blur(4px)",
        boxShadow: focused
          ? "0 0 0 1px #09144C, 0 8px 22px rgba(15,27,71,0.14)"
          : "0 1px 2px rgba(15,27,71,0.05), 0 8px 20px rgba(15,27,71,0.10)",
        outline: "none",
        WebkitAppearance: "none",
        transition: "box-shadow 0.15s ease",
        width: "100%",
      }}
    />
  );
}

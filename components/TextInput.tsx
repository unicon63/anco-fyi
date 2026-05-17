"use client";

import { useState, forwardRef } from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
  onEnter?: () => void;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ value, onChange, placeholder, type = "text", autoFocus, onEnter }, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) onEnter();
        }}
        className="w-full rounded-[14px] font-sans text-[17px] font-normal placeholder:opacity-40"
        style={{
          background: "rgba(247, 241, 226, 0.72)",
          border: "none",
          padding: "18px 20px",
          color: "#0F1B47",
          WebkitBackdropFilter: "blur(4px)",
          backdropFilter: "blur(4px)",
          boxShadow: focused
            ? "0 0 0 1px #09144C, 0 8px 22px rgba(15,27,71,0.14)"
            : "0 1px 2px rgba(15,27,71,0.05), 0 8px 20px rgba(15,27,71,0.10)",
          outline: "none",
          WebkitAppearance: "none",
          transition: "box-shadow 0.15s ease",
        }}
      />
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;

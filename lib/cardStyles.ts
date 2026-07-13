import { CSSProperties } from "react";

export const infoCardStyle: CSSProperties = {
  background: "rgba(247, 241, 226, 0.52)",
  WebkitBackdropFilter: "blur(4px)",
  backdropFilter: "blur(4px)",
  boxShadow: "0 1px 2px rgba(15,27,71,0.05), 0 8px 20px rgba(15,27,71,0.10)",
  borderRadius: "14px",
  padding: "16px 18px",
};

export const infoHeadingStyle: CSSProperties = {
  fontSize: "11px",
  color: "#0F1B47",
  opacity: 0.55,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  margin: "0 0 6px",
  fontFamily: "var(--font-work-sans), system-ui, sans-serif",
  fontWeight: 600,
};

export const infoBodyStyle: CSSProperties = {
  fontSize: "15px",
  color: "#0F1B47",
  lineHeight: 1.55,
  margin: 0,
  fontFamily: "var(--font-work-sans), system-ui, sans-serif",
};

export const mapLinkStyle: CSSProperties = {
  color: "#0F1B47",
  textDecorationLine: "underline",
  textDecorationColor: "rgba(15, 27, 71, 0.3)",
  textDecorationThickness: "1px",
  textUnderlineOffset: "2px",
};

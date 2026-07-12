import Link from "next/link";
import TravelCards from "@/components/TravelCards";
import MenuDropdown from "@/components/MenuDropdown";

export default function TravelPage() {
  return (
    <div className="phone-frame flex flex-col" style={{ minHeight: "100svh" }}>
      {/* Top bar */}
      <div style={{ position: "relative", padding: "8px 18px 0", flexShrink: 0 }}>
        <Link
          href="/"
          className="text-center font-sans font-medium tracking-[0.22em] uppercase"
          style={{ fontSize: "11px", color: "#0F1B47", opacity: 0.7, textDecoration: "none", display: "block" }}
        >
          ANCO.FYI
        </Link>
        <div style={{ position: "absolute", top: "8px", right: "8px" }}>
          <MenuDropdown />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "28px 24px 40px", flex: 1 }}>
        <h1
          className="font-serif"
          style={{
            fontSize: "30px",
            color: "#0F1B47",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            margin: "0 0 18px",
            lineHeight: 1.2,
          }}
        >
          Travel
        </h1>
        <TravelCards />
      </div>
    </div>
  );
}

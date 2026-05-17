import Link from "next/link";
import Image from "next/image";
import PrimaryButton from "@/components/PrimaryButton";

export default function HeroPage() {
  return (
    <div
      className="phone-frame flex flex-col"
      style={{ minHeight: "100svh" }}
    >
      {/* Safe area — desktop only */}
      <div className="hidden sm:block" style={{ height: "56px", flexShrink: 0 }} />

      {/* ANCO.FYI mark */}
      <div
        className="text-center font-sans font-medium tracking-[0.22em] uppercase"
        style={{
          fontSize: "11px",
          color: "#0F1B47",
          opacity: 0.7,
          marginTop: "22px",
          flexShrink: 0,
        }}
      >
        ANCO.FYI
      </div>

      {/* 14px anchor gap */}
      <div style={{ height: "14px", flexShrink: 0 }} />

      {/* Rhinestone PNG */}
      <div className="flex justify-center" style={{ flexShrink: 0 }}>
        <Image
          src="/assets/to-be-wed-transparent.png"
          alt="To Be Wed"
          width={641}
          height={907}
          priority
          style={{
            width: "100%",
            maxWidth: "700px",
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 1px 2px rgba(15, 27, 71, 0.2))",
          }}
        />
      </div>

      {/* Flexible spacer */}
      <div style={{ flex: 1, minHeight: "12px" }} />

      {/* Title block — 28px left padding */}
      <div style={{ padding: "0 28px", flexShrink: 0 }}>
        <p
          className="font-serif"
          style={{
            fontSize: "32px",
            color: "#0F1B47",
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          ANNIE &amp; NICO
        </p>
        <p
          className="font-serif"
          style={{
            fontSize: "32px",
            color: "#0F1B47",
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          JUNE 19—20 2027
        </p>

        <div style={{ height: "18px" }} />

        <p
          className="font-serif"
          style={{
            fontSize: "16px",
            color: "#0F1B47",
            opacity: 0.92,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          NEAR LICCIANA NARDI, TUSCANY, ITALY
        </p>
        <a
          href="https://www.google.com/maps?q=44.253583,10.040472"
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif hover:underline"
          style={{
            display: "block",
            fontSize: "16px",
            color: "#0F1B47",
            opacity: 0.92,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 1.4,
            textDecoration: "none",
          }}
        >
          44°15′12.9″N&nbsp;&nbsp;10°02′25.7″E
        </a>
      </div>

      {/* 28px gap */}
      <div style={{ height: "28px", flexShrink: 0 }} />

      {/* RSVP pill button — centered */}
      <div className="flex justify-center" style={{ padding: "0 24px", flexShrink: 0 }}>
        <Link href="/rsvp" style={{ textDecoration: "none" }}>
          <PrimaryButton variant="hero">RSVP</PrimaryButton>
        </Link>
      </div>

      {/* 44px bottom padding */}
      <div style={{ height: "44px", flexShrink: 0 }} />
    </div>
  );
}

import Image from "next/image";
import RhinestoneSparkles from "@/components/RhinestoneSparkles";

interface HeroVisualProps {
  action?: React.ReactNode;
  topRight?: React.ReactNode;
}

export default function HeroVisual({ action, topRight }: HeroVisualProps) {
  return (
    <div className="phone-frame flex flex-col" style={{ minHeight: "100svh", position: "relative" }}>
      {/* ANCO.FYI mark */}
      <div
        className="text-center font-sans font-medium tracking-[0.22em] uppercase"
        style={{
          fontSize: "11px",
          color: "#0F1B47",
          opacity: 0.7,
          marginTop: "8px",
          flexShrink: 0,
        }}
      >
        ANCO.FYI
      </div>

      {/* Top-right slot — absolutely anchored to the phone-frame */}
      {topRight && (
        <div style={{ position: "absolute", top: "8px", right: "8px", zIndex: 10 }}>
          {topRight}
        </div>
      )}

      {/* 2px anchor gap */}
      <div style={{ height: "0px", flexShrink: 0 }} />

      {/* Rhinestone PNG */}
      <div className="flex justify-center items-center" style={{ flex: 1, minHeight: "0px", paddingTop: "24px" }}>
        <Image
          src="/assets/tobewed3.png"
          alt="To Be Wed"
          width={436}
          height={618}
          priority
          className="rhinestone-img"
          style={{
            maxWidth: "max(373px, min(436px, 85vw))",
            width: "100%",
            minHeight: "150px",
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 1px 2px rgba(15, 27, 71, 0.2))",
          }}
        />
        <RhinestoneSparkles />
      </div>

      {/* 0px gap after rhinestone */}
      <div style={{ height: "0px", flexShrink: 0 }} />

      {/* Title block — 28px left padding */}
      <div style={{ padding: "0 28px", marginTop: "20px", flexShrink: 0 }}>
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

        <div style={{ height: "12px" }} />

        <p
          className="font-serif"
          data-address="false"
          style={{
            fontSize: "16px",
            color: "#0F1B47",
            opacity: 0.92,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 1.4,
            margin: 0,
            textDecoration: "none",
            pointerEvents: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
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
            textDecorationLine: "underline",
            textDecorationColor: "rgba(15, 27, 71, 0.3)",
            textDecorationThickness: "1px",
            textUnderlineOffset: "2px",
          }}
        >
          44°15′12.9″N&nbsp;&nbsp;10°02′25.7″E
        </a>
      </div>

      {/* Action area — only rendered when an action is provided */}
      {action ? (
        <>
          <div className="location-rsvp-gap" style={{ height: "40px", flexShrink: 0 }} />
          <div style={{ padding: "0 24px 28px", flexShrink: 0 }}>
            <div className="flex justify-center">
              {action}
            </div>
          </div>
        </>
      ) : (
        <div style={{ height: "28px", flexShrink: 0 }} />
      )}
    </div>
  );
}

import { infoCardStyle, infoHeadingStyle, infoBodyStyle, mapLinkStyle } from "@/lib/cardStyles";

export default function ItineraryCards() {
  return (
    <div className="flex flex-col" style={{ gap: "12px" }}>
      {/* Friday card */}
      <div style={infoCardStyle}>
        <p style={infoHeadingStyle}>FRIDAY — EVENING DRINKS (OPTIONAL)</p>
        <p style={{ ...infoBodyStyle, lineHeight: 1.65 }}>
          Location:{" "}
          <a href="https://maps.app.goo.gl/xdNDSm2r5RQTpQhL7" target="_blank" rel="noopener noreferrer" style={mapLinkStyle}>Bagnone</a>
        </p>
        <p style={{ ...infoBodyStyle, lineHeight: 1.65 }}>Time: 20:30 (after dinner)</p>
        <p style={{ ...infoBodyStyle, lineHeight: 1.65 }}>Dress: Smart Casual</p>
      </div>

      {/* Saturday card */}
      <div style={infoCardStyle}>
        <p style={infoHeadingStyle}>SATURDAY — ANNIE &amp; NICO&apos;S WEDDING</p>
        <p style={{ ...infoBodyStyle, lineHeight: 1.65 }}>
          Location:{" "}
          <a href="https://maps.app.goo.gl/u9iHESJmEEcYMTiU7" target="_blank" rel="noopener noreferrer" style={mapLinkStyle}>Casa Dell&apos;Angelo</a>
        </p>
        <p style={{ ...infoBodyStyle, lineHeight: 1.65 }}>Guests arrive: 16:30</p>
        <p style={{ ...infoBodyStyle, lineHeight: 1.65 }}>Ceremony: 17:00</p>
        <p style={{ ...infoBodyStyle, lineHeight: 1.65 }}>Reception: 18:00 – 02:00</p>
        <p style={{ ...infoBodyStyle, lineHeight: 1.65 }}>Dress: Toscana Elegante</p>
      </div>

      {/* Sunday card */}
      <div style={infoCardStyle}>
        <p style={infoHeadingStyle}>SUNDAY — FESTA IN GIARDINO (OPTIONAL)</p>
        <p style={{ ...infoBodyStyle, lineHeight: 1.65 }}>
          Location:{" "}
          <a href="https://maps.app.goo.gl/9tVYWCC71cpM4LCv6" target="_blank" rel="noopener noreferrer" style={mapLinkStyle}>Casa Del Torrentello</a>
        </p>
        <p style={{ ...infoBodyStyle, lineHeight: 1.65 }}>Time: 16:00</p>
        <p style={{ ...infoBodyStyle, lineHeight: 1.65 }}>Dress: Pool Chic</p>
      </div>
    </div>
  );
}

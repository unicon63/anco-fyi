import { infoCardStyle, infoHeadingStyle, infoBodyStyle, mapLinkStyle } from "@/lib/cardStyles";

export default function TravelCards() {
  return (
    <div className="flex flex-col" style={{ gap: "12px" }}>
      {/* Location card */}
      <div style={infoCardStyle}>
        <p style={infoHeadingStyle}>LOCATION</p>
        <p style={infoBodyStyle}>
          The venue is near Licciana Nardi in Lunigiana, northern Tuscany.
        </p>
        <p style={{ ...infoBodyStyle, marginTop: "6px" }}>
          We recommend sharing a hire car.
        </p>
        <a
          href="https://www.google.com/maps?q=44.253583,10.040472"
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif"
          style={{
            display: "block",
            marginTop: "8px",
            fontSize: "14px",
            color: "#0F1B47",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            textDecorationLine: "underline",
            textDecorationColor: "rgba(15, 27, 71, 0.3)",
            textDecorationThickness: "1px",
            textUnderlineOffset: "2px",
          }}
        >
          44°15′12.9″N&nbsp;&nbsp;10°02′25.7″E
        </a>
      </div>

      {/* Airports card */}
      <div style={infoCardStyle}>
        <p style={infoHeadingStyle}>AIRPORTS</p>
        {[
          "Pisa Airport — 1hr drive",
          "Genova Airport — 1hr 20min drive",
          "Bologna Airport — 2hr 20min drive",
          "Milan Linate Airport — 2hr 30min drive",
        ].map((line) => (
          <p key={line} style={{ ...infoBodyStyle, lineHeight: 1.65 }}>{line}</p>
        ))}
      </div>

      {/* Train card */}
      <div style={infoCardStyle}>
        <p style={infoHeadingStyle}>TRAIN STATION</p>
        <p style={infoBodyStyle}>
          If travelling by train,{" "}
          <a
            href="https://maps.app.goo.gl/RDvaew1fFoXxqH9H9"
            target="_blank"
            rel="noopener noreferrer"
            style={mapLinkStyle}
          >
            Aulla Lunigiana Station
          </a>{" "}
          is 15 min drive from the venue.
        </p>
      </div>
    </div>
  );
}

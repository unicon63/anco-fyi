export default function TravelPage() {
  return (
    <div className="phone-frame flex flex-col" style={{ minHeight: "100svh" }}>
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

      {/* Content */}
      <div style={{ padding: "0 28px", marginTop: "32px", flex: 1 }}>
        {/* Main title */}
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
          Travel Information
        </p>

        <div style={{ height: "24px" }} />

        {/* Location section */}
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
          LOCATION
        </p>
        <div style={{ height: "8px" }} />
        <p
          className="font-sans"
          style={{
            fontSize: "15px",
            color: "#0F1B47",
            opacity: 0.85,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          The venue is located near Licciana Nardi in Lunigiana, northern Tuscany.
        </p>
        <div style={{ height: "8px" }} />
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

        <div style={{ height: "28px" }} />

        {/* Airports */}
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
          AIRPORTS
        </p>
        <div style={{ height: "10px" }} />
        {[
          "Pisa Airport — 1hr drive",
          "Genova Airport — 1hr 20min drive",
          "Bologna Airport — 2hr 20min drive",
          "Milan Linate Airport — 2hr 30min drive",
        ].map((line) => (
          <p
            key={line}
            className="font-sans"
            style={{
              fontSize: "15px",
              color: "#0F1B47",
              opacity: 0.85,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {line}
          </p>
        ))}

        <div style={{ height: "28px" }} />

        {/* Train station */}
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
          TRAIN STATION
        </p>
        <div style={{ height: "10px" }} />
        <p
          className="font-sans"
          style={{
            fontSize: "15px",
            color: "#0F1B47",
            opacity: 0.85,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          If travelling by train,{" "}
          <a
            href="https://maps.app.goo.gl/RDvaew1fFoXxqH9H9"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0F1B47",
              textDecorationLine: "underline",
              textDecorationColor: "rgba(15, 27, 71, 0.3)",
              textDecorationThickness: "1px",
              textUnderlineOffset: "2px",
            }}
          >
            Aulla Lunigiana Station
          </a>{" "}
          is 15 mins from the venue.
        </p>
      </div>

      <div style={{ height: "40px", flexShrink: 0 }} />
    </div>
  );
}

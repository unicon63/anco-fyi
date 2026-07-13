import { infoCardStyle, infoHeadingStyle, infoBodyStyle, mapLinkStyle } from "@/lib/cardStyles";

export default function AccommodationCards() {
  return (
    <div className="flex flex-col" style={{ gap: "12px" }}>
      {/* Booking yourself card */}
      <div style={infoCardStyle}>
        <p style={infoHeadingStyle}>IF BOOKING YOURSELF</p>
        <p style={infoBodyStyle}>
          If you&rsquo;re booking your own accommodation, we recommend doing
          so soon. The venue is fairly isolated, so nearby places will fill
          up quickly. Good areas to look are between the venue and Comano,
          Fivizzano, Aulla and Bagnone.
        </p>
        <p style={{ ...infoBodyStyle, marginTop: "8px" }}>
          Once you&rsquo;ve booked, please let us know so we can add you to
          the wedding transfers list; we&rsquo;re arranging a lift home for
          anyone who&rsquo;d like one.
        </p>
      </div>

      {/* Help booking card */}
      <div style={infoCardStyle}>
        <p style={infoHeadingStyle}>IF YOU&rsquo;D LIKE HELP</p>
        <p style={infoBodyStyle}>
          If you selected that you&rsquo;d like help booking, we&rsquo;ll be
          in touch shortly. Alternatively, you can contact Marta{" "}
          who&rsquo;s helping with logistics, at{" "}
          <a
            href="mailto:thelandofthemoon@gmail.com"
            style={mapLinkStyle}
          >
            thelandofthemoon@gmail.com
          </a>
          . Just let her know you&rsquo;re coming to Annie &amp; Nico&rsquo;s
          wedding and how many are in your group, and she&rsquo;ll help find
          something suitable.
        </p>
      </div>
    </div>
  );
}

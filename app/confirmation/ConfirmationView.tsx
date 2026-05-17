"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RSVPData, ATTENDING_LABELS, STAY_LABELS } from "@/lib/types";
import SummaryCard from "@/components/SummaryCard";
import PrimaryButton from "@/components/PrimaryButton";

export default function ConfirmationView() {
  const router = useRouter();
  const params = useSearchParams();
  const [data, setData] = useState<RSVPData | null>(null);
  const declined = params.get("declined") === "true";

  useEffect(() => {
    if (declined) {
      // Declined path — name from query param
      const name = params.get("name") || "";
      setData({
        name,
        attending: "no",
        email: "",
        address: { line1: "", line2: "", city: "", postcode: "", country: "" },
        dietary: "",
        stay: "",
      });
    } else {
      const stored = sessionStorage.getItem("rsvp-data");
      if (stored) {
        setData(JSON.parse(stored));
      }
    }
  }, [declined, params]);

  if (!data) return null;

  const isDeclined = data.attending === "no";

  const postalValue = [
    data.address.line1,
    data.address.line2,
    data.address.city && data.address.postcode
      ? `${data.address.city} ${data.address.postcode}`.trim()
      : data.address.city || data.address.postcode,
    data.address.country,
  ]
    .filter(Boolean)
    .join(", ");

  const summaryRows = isDeclined
    ? [
        { label: "NAME", value: data.name },
        { label: "ATTENDING", value: ATTENDING_LABELS[data.attending] || data.attending },
      ]
    : [
        { label: "NAME", value: data.name },
        { label: "ATTENDING", value: ATTENDING_LABELS[data.attending] || data.attending },
        { label: "EMAIL", value: data.email },
        { label: "POSTAL", value: postalValue || "—" },
        { label: "DIETARY", value: data.dietary.trim() || "—" },
        { label: "STAY", value: STAY_LABELS[data.stay] || data.stay || "—" },
      ];

  const handleEditReply = () => {
    // Return to last relevant step
    const targetStep = isDeclined ? 2 : 6;
    router.push(`/rsvp?edit=${targetStep}`);
  };

  const handleStartOver = () => {
    sessionStorage.removeItem("rsvp-data");
    router.push("/");
  };

  return (
    <div
      className="phone-frame flex flex-col animate-fade-slide"
      style={{ minHeight: "100svh" }}
    >
      {/* Safe area */}
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

      {/* Main content */}
      <div style={{ flex: 1, padding: "36px 24px 0" }}>
        {/* THANK YOU headline */}
        <h1
          className="font-serif"
          style={{
            fontSize: "44px",
            color: "#0F1B47",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            margin: "0 0 16px",
            lineHeight: 1.1,
          }}
        >
          Thank you
        </h1>

        <p
          className="font-sans font-normal"
          style={{
            fontSize: "16px",
            color: "#0F1B47",
            opacity: 0.8,
            margin: "0 0 28px",
            lineHeight: 1.5,
          }}
        >
          Your RSVP has been received.
        </p>

        {/* Summary card */}
        <SummaryCard rows={summaryRows} />
      </div>

      {/* Spacer */}
      <div style={{ flex: 1, minHeight: "24px" }} />

      {/* Action buttons */}
      <div style={{ padding: "12px 24px 44px", flexShrink: 0 }}>
        <div className="flex flex-col" style={{ gap: "12px" }}>
          <PrimaryButton variant="outline" onClick={handleEditReply}>
            EDIT REPLY
          </PrimaryButton>
          <PrimaryButton onClick={handleStartOver}>
            START OVER
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

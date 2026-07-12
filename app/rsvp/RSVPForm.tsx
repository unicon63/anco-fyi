"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RSVPData, AttendingValue, StayValue, STAY_NOTES, ATTENDING_LABELS, STAY_LABELS } from "@/lib/types";
import PrimaryButton from "@/components/PrimaryButton";
import ChoiceCard from "@/components/ChoiceCard";
import TextInput from "@/components/TextInput";
import AddressInput from "@/components/AddressInput";
import NoteCard from "@/components/NoteCard";
import SummaryCard from "@/components/SummaryCard";
import TravelCards from "@/components/TravelCards";
import ItineraryCards from "@/components/ItineraryCards";
import HeroVisual from "@/components/HeroVisual";
import Image from "next/image";

const TOTAL_STEPS = 11;

const initialData: RSVPData = {
  name: "",
  attending: "",
  email: "",
  address: { line1: "", line2: "", city: "", postcode: "", country: "" },
  dietary: "",
  stay: "",
};

function canContinue(step: number, data: RSVPData): boolean {
  switch (step) {
    case 1:  return true;
    case 2:  return true;
    case 3:  return data.name.trim().length > 1;
    case 4:  return true;
    case 5:  return true;
    case 6:  return !!data.attending;
    case 7:  return /.+@.+\..+/.test(data.email);
    case 8:  return !!(data.address.line1 && data.address.city && data.address.country);
    case 9:  return true;
    case 10: return !!data.stay;
    case 11: return true;
    default: return false;
  }
}

export default function RSVPForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<RSVPData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);

  // Restore saved data and step when returning to edit
  useEffect(() => {
    const stored = sessionStorage.getItem("rsvp-data");
    if (stored) {
      setData(JSON.parse(stored));
    }
    const editStep = params.get("edit");
    if (editStep) {
      const n = parseInt(editStep, 10);
      if (n >= 1 && n <= TOTAL_STEPS) setStep(n);
    }
  }, [params]);

  const advance = useCallback(async () => {
    if (!canContinue(step, data)) return;

    if (step === 6 && data.attending === "no") {
      // Declined — submit minimal data then skip to confirmation
      setSubmitting(true);
      setError(null);
      try {
        await fetch("/api/submit-rsvp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        sessionStorage.setItem("rsvp-data", JSON.stringify(data));
        router.push("/confirmation?declined=true&name=" + encodeURIComponent(data.name));
      } catch {
        setError("Something went wrong. Please try again.");
        setSubmitting(false);
      }
      return;
    }

    // Persist data so edit-reply works
    sessionStorage.setItem("rsvp-data", JSON.stringify(data));

    if (step === 11) {
      // Final step — submit
      setSubmitting(true);
      setError(null);
      try {
        const res = await fetch("/api/submit-rsvp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Submission failed");
        sessionStorage.setItem("rsvp-data", JSON.stringify(data));
        router.push("/confirmation");
      } catch {
        setError("Something went wrong. Please try again.");
        setSubmitting(false);
      }
      return;
    }

    setAnimKey((k) => k + 1);
    setStep((s) => s + 1);
  }, [step, data, router]);

  const goBack = useCallback(() => {
    if (step > 1) {
      setAnimKey((k) => k + 1);
      setStep((s) => s - 1);
    }
  }, [step]);

  // ── Step 1: Hero — render standalone, no form chrome ──────────────────────
  if (step === 1) {
    return (
      <HeroVisual
        action={
          <PrimaryButton variant="hero" onClick={advance}>
            RSVP
          </PrimaryButton>
        }
      />
    );
  }

  // ── Step 2: Welcome letter — renders standalone with its own layout ─────────
  if (step === 2) {
    return <WelcomeLetterStep onBack={goBack} onContinue={advance} />;
  }

  const displayedStep = step - 2;
  const displayedTotal = 8;
  const isRecapStep = step === 11;
  const progress = isRecapStep ? 100 : (displayedStep / displayedTotal) * 100;
  const valid = canContinue(step, data);
  const isFinalStep = step === 11;
  const title = STEP_TITLES[step] ?? "";

  return (
    <div className="phone-frame flex flex-col">
      {/* Top bar */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "22px 18px 0" }}
      >
        <button
          onClick={goBack}
          aria-label="Go back"
          className="font-sans font-semibold tracking-[0.22em] uppercase"
          style={{
            fontSize: "10px",
            color: "#0F1B47",
            opacity: 0.7,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          ← BACK
        </button>
        {!isRecapStep && (
          <span
            className="font-sans font-semibold tracking-[0.22em] uppercase"
            style={{ fontSize: "10px", color: "#0F1B47", opacity: 0.7 }}
            aria-current="step"
          >
            {String(displayedStep).padStart(2, "0")} / {String(displayedTotal).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ margin: "10px 18px 0", position: "relative" }}>
        <div
          style={{
            height: "1px",
            background: "rgba(15, 27, 71, 0.18)",
            borderRadius: "1px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "2px",
            width: `${progress}%`,
            background: "#09144C",
            borderRadius: "1px",
            transition: "width 0.4s ease",
            marginTop: "-0.5px",
          }}
        />
      </div>

      {/* Step content */}
      <div
        key={animKey}
        className="animate-fade-slide flex flex-col flex-1"
        style={{ minHeight: 0 }}
      >
        {/* Question title — suppressed for steps with no title (e.g. intro) */}
        {title ? (
          <>
            <div style={{ padding: "24px 24px 0" }}>
              <h1
                className="font-serif"
                style={{
                  fontSize: "30px",
                  color: "#0F1B47",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {title}
              </h1>
            </div>
            <div style={{ height: "18px" }} />
          </>
        ) : (
          <div style={{ height: "24px" }} />
        )}

        {/* Question body */}
        <div style={{ padding: "0 24px", flex: 1 }}>
          <StepBody step={step} data={data} setData={setData} onEnter={advance} />
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer */}
        <div style={{ padding: "12px 24px 28px", flexShrink: 0 }}>
          {/* Note card for stay step */}
          {step === 10 && data.stay && STAY_NOTES[data.stay] && (
            <div className="animate-fade-slide">
              <NoteCard text={STAY_NOTES[data.stay]} />
            </div>
          )}

          {/* Error toast */}
          {error && (
            <div
              className="font-sans text-[13px] rounded-[10px] mb-3 text-center"
              style={{
                background: "rgba(248, 220, 220, 0.92)",
                color: "#6E1313",
                padding: "10px 16px",
              }}
            >
              {error}
            </div>
          )}

          <div className="flex justify-center">
            <PrimaryButton
              onClick={advance}
              disabled={!valid}
              loading={submitting}
            >
              {(isFinalStep || (step === 6 && data.attending === "no")) ? "SEND RSVP" : "CONTINUE"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const STEP_TITLES: Record<number, string> = {
  2: "",
  3: "Full name",
  4: "Travel information",
  5: "Itinerary",
  6: "Will you be attending?",
  7: "Email address",
  8: "Postal address",
  9: "Dietary requirements or allergies",
  10: "Where will you be staying?",
  11: "Summary",
};

interface StepBodyProps {
  step: number;
  data: RSVPData;
  setData: React.Dispatch<React.SetStateAction<RSVPData>>;
  onEnter: () => void;
}

function StepBody({ step, data, setData, onEnter }: StepBodyProps) {
  switch (step) {
    case 3:
      return (
        <TextInput
          value={data.name}
          onChange={(v) => setData((d) => ({ ...d, name: v }))}
          placeholder="Your name"
          autoFocus
          onEnter={onEnter}
        />
      );

    case 4:
      return <TravelInfoStep />;

    case 5:
      return <ItineraryStep />;

    case 6:
      return (
        <AttendingStep
          value={data.attending}
          onChange={(v) => setData((d) => ({ ...d, attending: v }))}
        />
      );

    case 7:
      return (
        <TextInput
          value={data.email}
          onChange={(v) => setData((d) => ({ ...d, email: v }))}
          placeholder="Email address"
          type="email"
          autoFocus
          onEnter={onEnter}
        />
      );

    case 8:
      return (
        <AddressStep
          value={data.address}
          onChange={(v) => setData((d) => ({ ...d, address: v }))}
        />
      );

    case 9:
      return (
        <DietaryStep
          value={data.dietary}
          onChange={(v) => setData((d) => ({ ...d, dietary: v }))}
        />
      );

    case 10:
      return (
        <StayStep
          value={data.stay}
          onChange={(v) => setData((d) => ({ ...d, stay: v }))}
        />
      );

    case 11:
      return <RecapStep data={data} />;

    default:
      return null;
  }
}

// ─── Screen 2: Welcome Letter ─────────────────────────────────────────────────

function WelcomeLetterStep({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="phone-frame flex flex-col">

      {/* Top bar — step 2: back button only, no counter, no fill */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "22px 18px 0" }}
      >
        <button
          onClick={onBack}
          aria-label="Go back"
          className="font-sans font-semibold tracking-[0.22em] uppercase"
          style={{
            fontSize: "10px",
            color: "#0F1B47",
            opacity: 0.7,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          ← BACK
        </button>
      </div>
      {/* Thin baseline — no fill on step 2 (not yet started) */}
      <div style={{ margin: "10px 18px 0", position: "relative" }}>
        <div
          style={{
            height: "1px",
            background: "rgba(15, 27, 71, 0.18)",
            borderRadius: "1px",
          }}
        />
      </div>

      {/* Content: photo anchored at top, flex spacer fills the middle,
          letter pinned just above the Continue button.
          flex:1 + min-height:0 gives this a calculable height inside the
          fixed phone-frame on desktop so overflow-y:auto acts as a safety net.
          padding-top / font-size / buffer height / photo max-width all come
          from the .welcome-* CSS classes in globals.css (per-breakpoint). */}
      <div
        className="welcome-content"
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Photo — 92% wide, max-width from .welcome-photo CSS, aspect-ratio 3/2 */}
        <div
          className="welcome-photo"
          style={{
            width: "92%",
            aspectRatio: "3 / 2",
            position: "relative",
            borderRadius: "4px",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 18px 40px -18px rgba(3,7,25,0.55)",
          }}
        >
          <Image
            src="/assets/photo-couple.jpg"
            alt="Annie and Nico"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Spacer — absorbs all remaining space so the letter stays at the bottom */}
        <div className="welcome-photo-gap" style={{ flex: 1, minHeight: 0 }} />

        {/* Letter — font-size from .welcome-letter CSS, pinned to bottom by spacer above */}
        <div
          className="welcome-letter"
          style={{
            width: "92%",
            fontFamily: "var(--font-instrument-serif), Georgia, serif",
            lineHeight: 1.5,
            letterSpacing: "0.02em",
            color: "#0F1B47",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <p style={{ margin: 0 }}>
            Ciao Amori,
            <br />
            <br />
            We would love for you to join us for our wedding, though we know
            Tuscany is a long way to come. To help us plan, we&rsquo;d really
            appreciate a few minutes filling out this form. Nico&rsquo;s
            Italian roots bring us to Lunigiana,{" "}
            <em>the land of the moon</em>, where the wedding will be held at
            the family&rsquo;s casa. Casa dell&rsquo;Angelo,{" "}
            <em>the house of the angel</em>, feels like the fitting place to
            host our nearest and dearest.
          </p>
        </div>

        {/* Gap below letter — height from .welcome-buffer CSS */}
        <div className="welcome-buffer" style={{ flexShrink: 0 }} />
      </div>

      {/* Footer: Continue button — always pinned at the bottom */}
      <div
        style={{
          padding: "12px 24px 28px",
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PrimaryButton onClick={onContinue}>
          CONTINUE
        </PrimaryButton>
      </div>

    </div>
  );
}

// ─── Step 6: Attending ────────────────────────────────────────────────────────

const ATTENDING_OPTIONS: { letter: string; value: AttendingValue; label: string }[] = [
  { letter: "A", value: "both", label: "Yes, both days; Saturday 19th for the wedding, and Sunday 20th for the day-2 party" },
  { letter: "B", value: "sat", label: "Just Saturday 19th for the wedding" },
  { letter: "C", value: "no", label: "Sadly not" },
];

function AttendingStep({
  value,
  onChange,
}: {
  value: AttendingValue;
  onChange: (v: AttendingValue) => void;
}) {
  return (
    <div className="flex flex-col" style={{ gap: "12px" }}>
      {ATTENDING_OPTIONS.map((opt) => (
        <ChoiceCard
          key={opt.value}
          letter={opt.letter}
          label={opt.label}
          selected={value === opt.value}
          onSelect={() => onChange(opt.value)}
        />
      ))}
    </div>
  );
}

// ─── Step 8: Address ─────────────────────────────────────────────────────────

interface AddressValue {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  country: string;
}

function AddressStep({
  value,
  onChange,
}: {
  value: AddressValue;
  onChange: (v: AddressValue) => void;
}) {
  const set = (field: keyof AddressValue) => (v: string) =>
    onChange({ ...value, [field]: v });

  return (
    <div className="flex flex-col" style={{ gap: "12px" }}>
      <AddressInput
        value={value.line1}
        onChange={set("line1")}
        placeholder="Address line 1"
        autoComplete="address-line1"
      />
      <AddressInput
        value={value.line2}
        onChange={set("line2")}
        placeholder="Address line 2 (optional)"
        autoComplete="address-line2"
      />
      {/* City + Postcode row */}
      <div className="flex" style={{ gap: "12px" }}>
        <div style={{ flex: 2 }}>
          <AddressInput
            value={value.city}
            onChange={set("city")}
            placeholder="Town / city"
            autoComplete="address-level2"
          />
        </div>
        <div style={{ flex: 1 }}>
          <AddressInput
            value={value.postcode}
            onChange={set("postcode")}
            placeholder="Postcode"
            autoComplete="postal-code"
          />
        </div>
      </div>
      <AddressInput
        value={value.country}
        onChange={set("country")}
        placeholder="Country"
        autoComplete="country-name"
      />
    </div>
  );
}

// ─── Step 9: Dietary ─────────────────────────────────────────────────────────

function DietaryStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full font-sans text-[17px] font-normal placeholder:opacity-40"
      style={{
        background: "rgba(247, 241, 226, 0.72)",
        border: "none",
        borderRadius: "14px",
        padding: "18px 20px",
        color: "#0F1B47",
        WebkitBackdropFilter: "blur(4px)",
        backdropFilter: "blur(4px)",
        boxShadow: focused
          ? "0 0 0 1px #09144C, 0 8px 22px rgba(15,27,71,0.14)"
          : "0 1px 2px rgba(15,27,71,0.05), 0 8px 20px rgba(15,27,71,0.10)",
        outline: "none",
        resize: "vertical",
        minHeight: "130px",
        transition: "box-shadow 0.15s ease",
        fontFamily: "var(--font-work-sans), system-ui, sans-serif",
      }}
      placeholder=""
    />
  );
}

// ─── Steps 4 & 5: Travel / Itinerary ─────────────────────────────────────────

function TravelInfoStep() {
  return <TravelCards />;
}

function ItineraryStep() {
  return <ItineraryCards />;
}

// ─── Step 10: Stay ────────────────────────────────────────────────────────────

const STAY_OPTIONS: { letter: string; value: StayValue; label: string }[] = [
  { letter: "A", value: "own", label: "I'll sort my own accommodation" },
  { letter: "B", value: "help", label: "I'd like some help finding somewhere nearby" },
];

function StayStep({
  value,
  onChange,
}: {
  value: StayValue;
  onChange: (v: StayValue) => void;
}) {
  return (
    <div className="flex flex-col" style={{ gap: "12px" }}>
      {STAY_OPTIONS.map((opt) => (
        <ChoiceCard
          key={opt.value}
          letter={opt.letter}
          label={opt.label}
          selected={value === opt.value}
          onSelect={() => onChange(opt.value)}
        />
      ))}
    </div>
  );
}

// ─── Step 11: Recap ────────────────────────────────────────────────────────────

function RecapStep({ data }: { data: RSVPData }) {
  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "");

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

  const summaryRows = [
    { label: "NAME",     value: data.name },
    { label: "ATTENDING", value: stripHtml(ATTENDING_LABELS[data.attending] || data.attending) },
    { label: "EMAIL",    value: data.email },
    { label: "POSTAL",   value: postalValue || "—" },
    { label: "DIETARY",  value: data.dietary.trim() || "—" },
    { label: "STAY",     value: STAY_LABELS[data.stay] || data.stay || "—" },
  ];

  return <SummaryCard rows={summaryRows} />;
}

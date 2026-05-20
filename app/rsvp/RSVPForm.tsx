"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RSVPData, AttendingValue, StayValue, STAY_NOTES } from "@/lib/types";
import PrimaryButton from "@/components/PrimaryButton";
import ChoiceCard from "@/components/ChoiceCard";
import TextInput from "@/components/TextInput";
import AddressInput from "@/components/AddressInput";
import NoteCard from "@/components/NoteCard";

const TOTAL_STEPS = 6;

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
    case 1: return data.name.trim().length > 1;
    case 2: return !!data.attending;
    case 3: return /.+@.+\..+/.test(data.email);
    case 4: return !!(data.address.line1 && data.address.city && data.address.country);
    case 5: return true;
    case 6: return !!data.stay;
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

    if (step === 2 && data.attending === "no") {
      // Declined — skip to confirmation
      router.push("/confirmation?declined=true&name=" + encodeURIComponent(data.name));
      return;
    }

    // Persist data so edit-reply works
    sessionStorage.setItem("rsvp-data", JSON.stringify(data));

    if (step === 6) {
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
        // Store data in sessionStorage for the confirmation page
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
    } else {
      router.push("/");
    }
  }, [step, router]);

  const progress = (step / TOTAL_STEPS) * 100;
  const valid = canContinue(step, data);
  const isFinalStep = step === 6;

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
        <span
          className="font-sans font-semibold tracking-[0.22em] uppercase"
          style={{ fontSize: "10px", color: "#0F1B47", opacity: 0.7 }}
          aria-current="step"
        >
          {String(step).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}
        </span>
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
        {/* Question title */}
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
            {STEP_TITLES[step]}
          </h1>
        </div>

        {/* 18px gap to first input */}
        <div style={{ height: "18px" }} />

        {/* Question body */}
        <div style={{ padding: "0 24px", flex: 1 }}>
          <StepBody step={step} data={data} setData={setData} onEnter={advance} />
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer */}
        <div style={{ padding: "12px 24px 28px", flexShrink: 0 }}>
          {/* Note card for step 6 */}
          {step === 6 && data.stay && STAY_NOTES[data.stay] && (
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

          <PrimaryButton
            onClick={advance}
            disabled={!valid}
            loading={submitting}
          >
            {isFinalStep ? "SEND RSVP" : "CONTINUE"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

const STEP_TITLES: Record<number, string> = {
  1: "Name",
  2: "Will you be attending?",
  3: "Email address",
  4: "Postal address",
  5: "Dietary requirements or allergies",
  6: "Where will you be staying?",
};

interface StepBodyProps {
  step: number;
  data: RSVPData;
  setData: React.Dispatch<React.SetStateAction<RSVPData>>;
  onEnter: () => void;
}

function StepBody({ step, data, setData, onEnter }: StepBodyProps) {
  switch (step) {
    case 1:
      return (
        <TextInput
          value={data.name}
          onChange={(v) => setData((d) => ({ ...d, name: v }))}
          placeholder="Your name"
          autoFocus
          onEnter={onEnter}
        />
      );

    case 2:
      return (
        <AttendingStep
          value={data.attending}
          onChange={(v) => setData((d) => ({ ...d, attending: v }))}
        />
      );

    case 3:
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

    case 4:
      return (
        <AddressStep
          value={data.address}
          onChange={(v) => setData((d) => ({ ...d, address: v }))}
        />
      );

    case 5:
      return (
        <DietaryStep
          value={data.dietary}
          onChange={(v) => setData((d) => ({ ...d, dietary: v }))}
        />
      );

    case 6:
      return (
        <StayStep
          value={data.stay}
          onChange={(v) => setData((d) => ({ ...d, stay: v }))}
        />
      );

    default:
      return null;
  }
}

// ─── Step 2: Attending ────────────────────────────────────────────────────────

const ATTENDING_OPTIONS: { letter: string; value: AttendingValue; label: string }[] = [
  { letter: "A", value: "both", label: "Yes, both days" },
  { letter: "B", value: "sat", label: "Just Saturday 19th" },
  { letter: "C", value: "longer", label: "Yes, both days and likely longer to enjoy the area" },
  { letter: "D", value: "no", label: "Sadly not" },
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

// ─── Step 4: Address ─────────────────────────────────────────────────────────

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

// ─── Step 5: Dietary ─────────────────────────────────────────────────────────

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

// ─── Step 6: Stay ────────────────────────────────────────────────────────────

const STAY_OPTIONS: { letter: string; value: StayValue; label: string }[] = [
  { letter: "A", value: "tent", label: "I'd like to stay in a tent on site with basic amenities" },
  { letter: "B", value: "own", label: "I'll sort my own accommodation" },
  { letter: "C", value: "help", label: "I'd love some help finding somewhere nearby" },
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

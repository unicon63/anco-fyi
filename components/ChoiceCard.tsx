"use client";

interface ChoiceCardProps {
  letter: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export default function ChoiceCard({
  letter,
  label,
  selected,
  onSelect,
}: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full text-left"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div
        className="flex items-start gap-[14px] rounded-[14px] px-[18px] py-[16px]"
        style={{
          background: "rgba(247, 241, 226, 0.72)",
          WebkitBackdropFilter: "blur(4px)",
          backdropFilter: "blur(4px)",
          boxShadow: selected
            ? "0 0 0 1px #09144C, 0 1px 2px rgba(15,27,71,0.05), 0 10px 22px rgba(15,27,71,0.14)"
            : "0 1px 2px rgba(15,27,71,0.05), 0 8px 20px rgba(15,27,71,0.10)",
        }}
      >
        {/* Letter chip */}
        <span
          className="flex-shrink-0 w-[26px] h-[26px] rounded-full flex items-center justify-center"
          style={{
            background: selected ? "#09144C" : "transparent",
            border: selected ? "1px solid #09144C" : "1px solid rgba(15,27,71,0.2)",
          }}
        >
          <span
            className="font-sans text-[11px] font-semibold tracking-[0.04em] uppercase"
            style={{ color: selected ? "#F7F1E2" : "#0F1B47" }}
          >
            {letter}
          </span>
        </span>

        {/* Label */}
        <span
          className="font-sans text-[16px] font-normal leading-[1.4] pt-[3px]"
          style={{ color: "#0F1B47" }}
        >
          {label}
        </span>
      </div>
    </button>
  );
}

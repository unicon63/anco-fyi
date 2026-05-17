interface SummaryRow {
  label: string;
  value: string;
}

interface SummaryCardProps {
  rows: SummaryRow[];
}

export default function SummaryCard({ rows }: SummaryCardProps) {
  return (
    <div
      className="rounded-[18px]"
      style={{
        background: "rgba(247, 241, 226, 0.72)",
        padding: "20px 22px",
        WebkitBackdropFilter: "blur(4px)",
        backdropFilter: "blur(4px)",
        boxShadow: "0 1px 2px rgba(15,27,71,0.05), 0 12px 28px rgba(15,27,71,0.12)",
      }}
    >
      <div
        className="font-sans text-[10px] font-semibold tracking-[0.22em] uppercase"
        style={{ color: "#0F1B47", opacity: 0.55, marginBottom: "14px" }}
      >
        Your Reply
      </div>

      {rows.map((row, i) => (
        <div key={row.label}>
          {i > 0 && (
            <div
              style={{
                height: "1px",
                background: "rgba(15, 27, 71, 0.10)",
                marginLeft: "0",
              }}
            />
          )}
          <div className="flex gap-3 py-[10px]">
            <div
              className="font-sans text-[10px] font-semibold tracking-[0.22em] uppercase flex-shrink-0"
              style={{ width: "72px", color: "#0F1B47", opacity: 0.55, paddingTop: "1px" }}
            >
              {row.label}
            </div>
            <div
              className="font-sans text-[15px] font-normal flex-1"
              style={{ color: "#0F1B47" }}
            >
              {row.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

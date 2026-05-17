interface NoteCardProps {
  text: string;
}

export default function NoteCard({ text }: NoteCardProps) {
  return (
    <div
      className="rounded-[12px] font-sans text-[14px] font-normal leading-[1.5]"
      style={{
        marginBottom: "14px",
        padding: "14px 16px",
        background: "rgba(247, 241, 226, 0.72)",
        border: "1px solid rgba(247, 241, 226, 0.4)",
        color: "#0F1B47",
        WebkitBackdropFilter: "blur(4px)",
        backdropFilter: "blur(4px)",
        boxShadow: "0 1px 2px rgba(15,27,71,0.04), 0 8px 20px rgba(15,27,71,0.08)",
      }}
    >
      {text}
    </div>
  );
}

import HeroVisual from "@/components/HeroVisual";
import MenuDropdown from "@/components/MenuDropdown";

// Inert spacer that reserves exactly the same layout height as
// PrimaryButton variant="hero" (py-[18px] + text-[13px] font-semibold).
// visibility:hidden keeps the layout box while removing the element from
// visual rendering, pointer events, and the accessibility tree.
const heroSpacer = (
  <div
    aria-hidden="true"
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "18px 36px",
      fontSize: "13px",
      fontWeight: 600,
      fontFamily: "var(--font-work-sans), system-ui, sans-serif",
      letterSpacing: "0.22em",
      minWidth: "150px",
      visibility: "hidden",
      pointerEvents: "none",
      userSelect: "none",
    }}
  >
    RSVP
  </div>
);

export default function HeroPage() {
  return <HeroVisual action={heroSpacer} topRight={<MenuDropdown />} />;
}

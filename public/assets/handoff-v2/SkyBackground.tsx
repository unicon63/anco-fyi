// components/SkyBackground.tsx  ← REPLACE the existing file with this
//
// FIX vs. v1: base image is /assets/sky-bg_empty.png (the gradient WITHOUT
// the static clouds painted on). The previous version pointed at sky-bg.png
// which in your repo is the composite — that's why static clouds were
// showing through in the corner.

export default function SkyBackground() {
  return (
    <div className="sky-bg" aria-hidden="true">
      <div className="sky-bg__inner">
        <img className="sky-bg__sky" src="/assets/sky-bg_empty.png" alt="" />

        {/* Cloud 1 — biggest, top */}
        <div className="sky-bg__track sky-bg__track--1">
          <img className="sky-bg__cloud sky-bg__cloud--1" src="/assets/Cloud1.png" alt="" />
          <img className="sky-bg__cloud sky-bg__cloud--1 sky-bg__cloud--dup" src="/assets/Cloud1.png" alt="" />
        </div>

        {/* Cloud 2 — middle */}
        <div className="sky-bg__track sky-bg__track--2">
          <img className="sky-bg__cloud sky-bg__cloud--2" src="/assets/Cloud2.png" alt="" />
          <img className="sky-bg__cloud sky-bg__cloud--2 sky-bg__cloud--dup" src="/assets/Cloud2.png" alt="" />
        </div>

        {/* Cloud 3 — smallest, lowest */}
        <div className="sky-bg__track sky-bg__track--3">
          <img className="sky-bg__cloud sky-bg__cloud--3" src="/assets/Cloud3.png" alt="" />
          <img className="sky-bg__cloud sky-bg__cloud--3 sky-bg__cloud--dup" src="/assets/Cloud3.png" alt="" />
        </div>
      </div>
    </div>
  );
}

import { Suspense } from "react";
import RSVPForm from "./RSVPForm";

export default function RSVPPage() {
  return (
    <Suspense>
      <RSVPForm />
    </Suspense>
  );
}

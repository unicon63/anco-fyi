export type AttendingValue = "both" | "sat" | "no" | "";
export type StayValue = "own" | "help" | "";

export interface RSVPData {
  name: string;
  attending: AttendingValue;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
    country: string;
  };
  dietary: string;
  stay: StayValue;
}

export const ATTENDING_LABELS: Record<string, string> = {
  both: "Yes, both days; Saturday for the wedding, and Sunday for the day-2 party",
  sat: "Just Saturday for the wedding",
  no: "Sadly not",
};

export const STAY_LABELS: Record<string, string> = {
  own: "Sorting own accommodation",
  help: "Help finding somewhere nearby",
};

export const STAY_NOTES: Record<string, string> = {
  own: "We appreciate this. The location is relatively isolated, so nearby places will fill up quickly. We recommend doing this soon!",
  help: "We have reserved some accommodation of varying sizes; more information to follow.",
};

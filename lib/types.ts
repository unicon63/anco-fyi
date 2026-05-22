export type AttendingValue = "both" | "sat" | "longer" | "no" | "";
export type StayValue = "tent" | "own" | "help" | "";

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
  both: "Yes, both days; Saturday 19th for the wedding, and Sunday 20th for the day-2 party",
  sat: "Just Saturday 19th for the wedding",
  longer: "Yes, both days and likely longer to enjoy the area",
  no: "Sadly not",
};

export const STAY_LABELS: Record<string, string> = {
  tent: "Tent on site",
  own: "Sorting own accommodation",
  help: "Help finding somewhere nearby",
};

export const STAY_NOTES: Record<string, string> = {
  tent: "Subject to numbers, we will let you know.",
  own: "We appreciate this. The location is relatively isolated, so nearby places will fill up quickly. We recommend doing this soon!",
  help: "We have reserved some accommodation of varying sizes; more information to follow.",
};

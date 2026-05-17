import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { RSVPData, ATTENDING_LABELS, STAY_LABELS } from "@/lib/types";

const SHEET_ID = "1zmUlnAMNemOQ3Ne2Mlm_X0M4cdPa8lz0L9ikpKxleyw";
const SHEET_NAME = "RSVPs";

function parseCredentials(raw: string) {
  // Vercel sometimes stores \n as literal two-char sequences (\n) instead of
  // real newlines, or vice-versa depending on how the value was pasted.
  // We normalise after parsing: ensure private_key uses real newlines.
  let parsed: Record<string, string>;
  try {
    parsed = JSON.parse(raw);
  } catch {
    // If JSON.parse fails the string may contain unescaped literal newlines
    // (e.g. from TextEdit). Replace them and try again.
    parsed = JSON.parse(raw.replace(/\n/g, "\\n"));
  }

  if (parsed.private_key) {
    // Convert any literal \n two-char sequences to real newlines that
    // the googleapis library requires for PEM key parsing.
    parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
  }

  return parsed;
}

async function getAuthClient() {
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentialsJson) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set");
  }

  const credentials = parseCredentials(credentialsJson);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return auth;
}

export async function POST(request: NextRequest) {
  try {
    const data: RSVPData = await request.json();

    // Validate required fields
    if (!data.name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const auth = await getAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    const timestamp = new Date().toISOString();
    const attendingLabel = ATTENDING_LABELS[data.attending] || data.attending;
    const stayLabel = data.stay ? (STAY_LABELS[data.stay] || data.stay) : "";

    // Columns: Timestamp, Name, Email, Attendance, PostalAddress_Line1–4, DietaryRequirements, AccommodationPreference
    const row = [
      timestamp,
      data.name.trim(),
      data.email || "",
      attendingLabel,
      data.address?.line1 || "",
      data.address?.line2 || "",
      data.address?.city
        ? `${data.address.city}${data.address.postcode ? " " + data.address.postcode : ""}`
        : "",
      data.address?.country || "",
      data.dietary?.trim() || "",
      stayLabel,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:J`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP submission error:", error);

    // In development without credentials, return success to allow UI testing
    if (
      process.env.NODE_ENV === "development" &&
      error instanceof Error &&
      error.message.includes("GOOGLE_SERVICE_ACCOUNT_JSON")
    ) {
      console.warn("⚠️  No Google credentials — simulating success in development");
      return NextResponse.json({ success: true, dev: true });
    }

    return NextResponse.json(
      { error: "Failed to submit RSVP. Please try again." },
      { status: 500 }
    );
  }
}

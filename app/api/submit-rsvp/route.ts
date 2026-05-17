import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { RSVPData, ATTENDING_LABELS, STAY_LABELS } from "@/lib/types";

const SHEET_ID = "1zmUlnAMNemOQ3Ne2Mlm_X0M4cdPa8lz0L9ikpKxleyw";
const SHEET_NAME = "RSVPs";

async function getAuthClient() {
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentialsJson) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set");
  }

  const credentials = JSON.parse(credentialsJson);

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

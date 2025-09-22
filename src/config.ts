import * as dotenv from "dotenv";

dotenv.config();

export default function getConfig() {
  return {
    baseUrl: "https://function.com",
    debug: process.env["DEBUG"],
    dadataToken: process.env["DADATA_TOKEN"] ?? "",
    dadataRegions: process.env["DADATA_REGIONS"]?.split(",") ?? [
      "Москва",
      "Московская",
    ],
    table: {
      email: process.env["GOOGLE_SPREADSHEET_EMAIL"] ?? "",
      tokenPath: process.env["GOOGLE_SPREADSHEET_API_KEY_PATH"] ?? "",
      id: process.env["GOOGLE_SPREADSHEET_ID"] ?? "",
    },
    email: {
      host: process.env["EMAIL_HOST"] ?? "smtp.gmail.com",
      port: Number(process.env["EMAIL_PORT"]) || 587,
      secure: process.env["EMAIL_SECURE"] === "true",
      user: process.env["EMAIL_USER"] ?? "",
      password: process.env["EMAIL_PASSWORD"] ?? "",
      from: process.env["EMAIL_FROM"] ?? "",
      to: process.env["EMAIL_TO"] ?? "",
    },
  };
}

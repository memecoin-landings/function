import getConfig from "@/config";
import { readFileSync } from "fs";
import { JWT } from "google-auth-library";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { injectable } from "tsyringe";
import { CommercialOfferDto } from "../server/actions/commercialOfferAction";

const dateFormat = "ru-RU";
const dateOptions = {
  timeZone: "Europe/Moscow",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
} as Intl.DateTimeFormatOptions;

@injectable()
export default class LeadTable {
  private _doc: GoogleSpreadsheet;
  private _commercialOfferSheet: Promise<GoogleSpreadsheetWorksheet>;

  constructor() {
    const data: { private_key: string } = JSON.parse(
      readFileSync(getConfig().table.tokenPath).toString(),
    );

    const jwt = new JWT({
      email: getConfig().table.email,
      key: data.private_key.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    // console.log("connecting", getConfig().table.id, jwt);
    console.log("connecting");
    this._doc = new GoogleSpreadsheet(getConfig().table.id, jwt);
    const loadPromise = this._doc.loadInfo();
    loadPromise.then(() => {
      console.log(
        "connected",
        this._doc.sheetCount,
        this._doc.authMode,
        this._doc.title,
      );
    });
    this._commercialOfferSheet = loadPromise.then(
      () => this._doc.sheetsByIndex[0]!,
    );
  }

  public async addCommercialOffer(offer: CommercialOfferDto) {
    const table = await this._commercialOfferSheet;
    if (!table) {
      console.error("commercial offer table is not yet initialized!");
      return;
    }

    const row = this.getCommercialOfferRow(offer);
    console.log(`adding commercial offer:`, offer, row);
    // await table.addRow(row, { raw: true });
    table
      .addRow(row, { raw: true })
      .then(() => console.log("commercial offer added"));
  }

  private getCommercialOfferRow(offer: CommercialOfferDto) {
    return [
      offer.timestamp.toLocaleString(dateFormat, dateOptions),
      offer.name,
      offer.phone.toString(),
      offer.email,
      offer.branding || "",
      offer.services.join(", "),
    ];
  }
}

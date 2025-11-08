/* eslint-disable @typescript-eslint/no-explicit-any */
import Contacts from "../domain/contacts";
import { GetValues } from "./strapi/types";

type StrapiContactInfo = GetValues<"api::contact-info.contact-info">;

export default class ContactsMapper {
  public static strapiToContacts(data: StrapiContactInfo): Contacts {
    return new Contacts({
      email: data["email"],
      phone: data["phone"],
      address: "", // Not in Strapi schema
      linkedin: data["linkedin"],
      behance: data["behance"],
      dribbble: data["dribbble"],
      whatsapp: data["whatsapp"],
      telegram: data["telegram"],
      instagram: data["instagram"],
    } as any);
  }
}

import "reflect-metadata";
import { injectable } from "tsyringe";
import Contacts from "../domain/contacts";
import ContactsMapper from "./contacts-mapper";
import StrapiClient from "./strapi/strapi-client";

@injectable()
export default class ContactsService {
  constructor(private readonly strapiClient: StrapiClient) {}

  async getContactInfo(): Promise<Contacts> {
    const response = await this.strapiClient.getTheOne(
      "api::contact-info.contact-info",
      "contact-info"
    );

    return ContactsMapper.strapiToContacts(response.data);
  }
}

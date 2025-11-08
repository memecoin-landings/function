import "reflect-metadata";
import { NextResponse } from "next/server";
import { container } from "tsyringe";
import ContactsService from "@/infrastructure/contacts.service";

// export const dynamic = "force-static";
//
export async function GET() {
  try {
    const service = container.resolve(ContactsService);
    const contacts = await service.getContactInfo();

    return NextResponse.json({
      email: contacts.email,
      phone: contacts.phone,
      address: contacts.address,
      socialLinks: contacts.socialLinks,
    });
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 },
    );
  }
}

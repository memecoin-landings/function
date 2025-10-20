import { useEffect, useState } from "react";
import Contacts from "../domain/contacts";

export function useContacts(): Contacts {
  const [contacts, setContacts] = useState<Contacts>(Contacts.default);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContacts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/contacts");
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }
        const data = (await response.json()) as Contacts;
        // setContacts(new Contacts(data));
        setContacts(data);
      } catch (error) {
        console.error("Failed to load contacts:", error);
        // Fallback to default on error
        setContacts(Contacts.default);
      } finally {
        setIsLoading(false);
      }
    };

    loadContacts();
  }, []);

  return contacts;
}

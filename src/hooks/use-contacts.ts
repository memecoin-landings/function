"use client";

import { useEffect, useState } from "react";
import Contacts from "../domain/contacts";

export function useContacts(): Contacts {
  const [contacts, setContacts] = useState<Contacts>(Contacts.default);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContacts = async () => {
      setIsLoading(true);
      try {
        // Try to load from static data first
        const response = await fetch("/data/contacts.json");
        if (response.ok) {
          const data = (await response.json()) as Contacts;
          setContacts(data);
        } else {
          // Fallback to default contacts
          setContacts(Contacts.default);
        }
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

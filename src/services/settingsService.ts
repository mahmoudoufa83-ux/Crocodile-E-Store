import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

export type SiteSettings = {
  logo: string;
  storeName: string;
  whatsapp: string;
  phone: string;
  email: string;
  facebook: string;
};

const settingsRef = doc(db, "settings", "site");

export async function getSiteSettings(): Promise<SiteSettings> {
  const snapshot = await getDoc(settingsRef);

  if (!snapshot.exists()) {
    throw new Error("Site settings not found");
  }

  return snapshot.data() as SiteSettings;
}

export async function updateSiteSettings(
  data: Partial<SiteSettings>
) {
  await updateDoc(settingsRef, data);
}
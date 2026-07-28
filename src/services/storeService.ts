import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import type { StoreSettings } from "../context/StoreContext";

const storeRef = doc(db, "settings", "store");

export async function getStoreSettings(): Promise<StoreSettings | null> {
  const snapshot = await getDoc(storeRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as StoreSettings;
}

export async function saveStoreSettings(
  data: StoreSettings
) {
  await setDoc(storeRef, data);
}
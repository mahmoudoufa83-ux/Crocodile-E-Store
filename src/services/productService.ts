import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

const productsRef = collection(db, "products");

export async function getProducts() {
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addProduct(product: any) {
  await addDoc(productsRef, product);
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, "products", id));
}

export async function updateProduct(
  id: string,
  data: any
) {
  await updateDoc(
    doc(db, "products", id),
    data
  );
}
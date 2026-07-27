import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import type { Product } from "../context/ProductContext";

const productsRef = collection(db, "products");

export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((document) => ({
    ...(document.data() as Omit<Product, "id">),
    id: document.id,
  })) as Product[];
}

export async function addProduct(product: Product) {
  const { id, ...data } = product;

  await addDoc(productsRef, data);
}

export async function updateProduct(product: Product) {
  const { id, ...data } = product;

  await updateDoc(
    doc(db, "products", String(id)),
    data
  );
}

export async function deleteProduct(id: string | number) {
  await deleteDoc(
    doc(db, "products", String(id))
  );
}
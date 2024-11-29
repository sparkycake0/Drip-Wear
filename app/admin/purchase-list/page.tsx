"use client";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore, productsRef, purchasesRef } from "@/app/db/firebase";
import { useEffect, useState } from "react";
import { deleteDoc } from "firebase/firestore";
interface CustomerData {
  id: string;
  name: string;
  phoneNum: string;
  address: string;
  gameName: string;
}
export default function PurchasesList() {
  const [allPurchases, setAllPurchases] = useState<CustomerData[]>([]);
  const getGames = async () => {
    const unsubscribe = onSnapshot(purchasesRef, async (snapshot) => {
      const customers = snapshot.docs.map((doc) => {
        try {
          return {
            id: doc.id,
            name: doc.data().name as string,
            phoneNum: doc.data().phoneNum as string,
            address: doc.data().address as string,
            gameName: doc.data().gameName as string,
          };
        } catch (err) {
          console.log(err);
        }
      }) as CustomerData[];
      setAllPurchases(customers);
    });
  };
  useEffect(() => {
    getGames();
  }, []);
  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(purchasesRef, id)); // Fix the Firestore reference
      console.log(`Document with ID ${id} successfully deleted`);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  return (
    <main>
      {allPurchases.map((customer, index) => (
        <main key={`${customer.name}-${index}`} className="flex gap-4">
          <div>{customer.name}</div>
          <div>{customer.phoneNum}</div>
          <div>{customer.address}</div>
          <div>{customer.gameName}</div>
          <button onClick={() => deleteProduct(customer.id)}>Delete</button>
        </main>
      ))}
    </main>
  );
}

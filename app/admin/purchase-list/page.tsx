"use client";
import { onSnapshot } from "firebase/firestore";
import { purchasesRef } from "@/app/db/firebase";
import { useEffect, useState } from "react";
interface CustomerData {
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
  return (
    <main>
      {allPurchases.map((customer, index) => (
        <main key={`${customer.name}-${index}`}>
          <div>{customer.name}</div>
          <div>{customer.phoneNum}</div>
          <div>{customer.address}</div>
          <div>{customer.gameName}</div>
          <button>Delete</button>
        </main>
      ))}
    </main>
  );
}

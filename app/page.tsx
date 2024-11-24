"use client";
import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { productsRef } from "./db/firebase";
import Link from "next/link";
import PurchaseForm from "./components/PurchaseForm";
import Image from "next/image";
import buy from './assets/grocery-store.png'
interface productData {
  name: string;
  desc: string;
  price: number;
  img: File | null;
  id: string;
}

export default function Home() {
  const [productsContainer, setProductsContainer] = useState<productData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const getProducts = async () => {
    const unsubscribe = onSnapshot(productsRef, async (snapshot) => {
      const products = snapshot.docs.map((doc) => {
        try {
          return {
            id: doc.id,
            name: doc.data().name as string,
            desc: doc.data().desc as string,
            price: doc.data().price as number,
            img: doc.data().img,
          };
        } catch (err) {
          console.log(err);
        }
      }) as productData[];
      setProductsContainer(products);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const togglePurchaseForm = (productId: string) => {
    setSelectedProduct(selectedProduct === productId ? null : productId);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-4 grid grid-cols-2 gap-4 h-96 lg:grid-cols-4 lg:gap-5 place-items-center w-max">
        {productsContainer.map((product, index) => (
          <div key={`${product.name}-${index}`} className="shadow-xl rounded-md p-5 flex flex-col justify-between bg-white w-64 min-h-96 gap-5">
            <div className="w-full flex flex-col gap-6">
              <div className="flex flex-col items-center">
                <Link href={`/products/${product.id}`} className="rounded-t-3xl w-8/12">
                  <img
                    src={product.img as any}
                    
                  />
                </Link>
              </div>
              <div className="text-xl font-semibold">{product.name}</div>
            </div>
            <div className="flex flex-col items-start gap-1 ">
              
              <button className="flex flex-row w-full border-0 justify-between items items-center bg-blue-300 p-2 rounded-md" onClick={() => togglePurchaseForm(product.id)}>
                <h1 className="font-bold text-2xl">${product.price}</h1>
                <div className="items-end bg-blue-400 p-2 rounded-full">
                  <Image src={buy} width={25} />
                </div>
              </button >
              {selectedProduct === product.id && (
                <PurchaseForm
                  purchaseFormShow={true}
                  setPurchaseFormShow={() => setSelectedProduct(null)}
                  productNameProp={product.name}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { productsRef } from "./db/firebase";
import Link from "next/link";
import PurchaseForm from "./components/PurchaseForm";
import Image from "next/image";
import buy from "./assets/cart-shopping-solid.svg";
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
    <div className="p-2  flex">
      <div className="w-full p-4 flex flex-col items-center gap-6 lg:grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))]">
        {productsContainer.map((product, index) => (
          <div
            key={`${product.name}-${index}`}
            className="border-2 rounded-md border-neutral-300 w-full h-full p-4 flex flex-col justify-between gap-6"
          >
            <div className="text-center bg-background flex flex-col gap-4">
              <div className=" rounded-t-xl ">
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.img as any}
                    className="w-full rounded-t-xl"
                  />
                </Link>
              </div>
              <div>{product.name}</div>
            </div>
            <div>
              <button
                onClick={() => togglePurchaseForm(product.id)}
                className="flex justify-between w-full p-4 bg-ascent rounded-md text-background transition-all duration-200 hover:scale-105"
              >
                <h1>{product.price} RSD</h1>
                <div>
                  <Image alt="asd" src={buy} width={25} />
                </div>
              </button>
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

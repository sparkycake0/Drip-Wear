"use client";

import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../db/firebase";
import React, { useEffect, useState } from "react";
import PurchaseForm from "@/app/components/PurchaseForm";

interface ProductData {
  name: string;
  desc: string;
  price: number;
  img: string;
  id: string;
}

export default function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const { id } = React.use(params);

  const fetchGame = async () => {
    const docRef = doc(firestore, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProduct(docSnap.data() as ProductData);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchGame();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  const togglePurchaseForm = (productId: string) => {
    setSelectedProduct(selectedProduct === productId ? null : productId);
  };
  return (
    <main className="flex flex-col items-center lg:items-start gap-10 p-4 lg:flex-row">
      <img src={product.img} alt={product.name} className="w-10/12 lg:w-1/2" />
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl text-center">{product.name}</h1>
        <p className="p-2 bg-ascent text-background rounded-md !font-normal">
          {product.desc}
        </p>
        <button
          onClick={() => togglePurchaseForm(product?.id)}
          className="flex justify-center w-full p-4 bg-ascent rounded-md text-white text-justify transition-all duration-200 hover:scale-105 "
        >
          <h1>{product.price} RSD</h1>
        </button>
        {selectedProduct === product.id && (
          <PurchaseForm
            purchaseFormShow={true}
            setPurchaseFormShow={() => setSelectedProduct(null)}
            productNameProp={product.name}
          />
        )}
      </div>
    </main>
  );
}

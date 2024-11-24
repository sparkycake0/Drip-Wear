"use client";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../db/firebase";
import { useEffect, useState } from "react";

interface ProductData {
  name: string;
  desc: string;
  price: number;
  img: string;
}

export default function GamePage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductData | null>(null);

  const fetchGame = async () => {
    const docRef = doc(firestore, "products", params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProduct(docSnap.data() as ProductData);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchGame();
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <img src={product.img} alt={product.name} className="w-2/12" />
      <h1>{product.name}</h1>
      <p>{product.desc}</p>
      <p className="text-black">${product.price}</p>
    </main>
  );
}

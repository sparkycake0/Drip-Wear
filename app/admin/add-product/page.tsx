"use client";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import {
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useState } from "react";
import { firestore, productsRef } from "../../db/firebase";

interface ProductData {
  name: string;
  desc: string;
  price: number;
  img: File | null;
}
export default function addGames() {
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    desc: "",
    price: 0,
    img: null,
  });
  const [productToDelete, setProductToDelete] = useState("");
  const deleteProduct = async () => {
    try {
      const q = query(productsRef, where("name", "==", productToDelete));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (gameDoc) => {
        await deleteDoc(doc(productsRef, gameDoc.id));
      });
      if (querySnapshot.empty) {
        console.log("No game found with that name.");
      }
    } catch (err) {
      console.error("Error deleting game: ", err);
    }
  };
  const addProduct = async () => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `games/${(productData.img as any).name}`);
      const snapshot = await uploadBytes(storageRef, productData.img as any);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await addDoc(productsRef, {
        name: productData.name,
        desc: productData.desc,
        price: productData.price,
        img: downloadURL,
      });
      console.log("Game added successfully!");
    } catch (err) {
      console.log("Error adding game: ", err);
    }
  };
  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addProduct();
            setProductData({
              name: "",
              desc: "",
              price: 0,
              img: null,
            });
          }}
        >
          <h1>Add product</h1>
          <div>
            <input
              type="text"
              onChange={(e) => {
                setProductData({ ...productData, name: e.target.value });
              }}
              value={productData.name}
            />
            <textarea
              onChange={(e) => {
                setProductData({ ...productData, desc: e.target.value });
              }}
              value={productData.desc}
            />

            <input
              type="number"
              onChange={(e) => {
                setProductData({
                  ...productData,
                  price: e.target.value as any,
                });
              }}
              value={productData.price}
            />
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setProductData({ ...productData, img: e.target.files[0] });
                }
              }}
            />
          </div>
          <button type="submit">Submit</button>
          <h1 className="text-5xl py-10">Delete product</h1>
          <div className="flex flex-row gap-10">
            <input
              placeholder="Product name"
              type="text"
              onChange={(e) => {
                setProductToDelete(e.target.value);
              }}
              className="p-2 rounded-lg w-max leading-9 shadow-xl"
            />
            <button onClick={() => deleteProduct()}>Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
}

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
    <div className="flex flex-col items-center justify-center">
      <div className="border-0 w-full h-screen flex flex-col items-center justify-center lg:w-5/6">
        <form
          className="flex flex-col w-5/6 h-5/6 border-0 gap-5 p-8 items-center justify-center rounded-xl shadow-0xl xl:w-max h-max"
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
          <h1 className="text-5xl ">Add product</h1>
          <div className="flex flex-col items-center justify-center w-full gap-5 py-8">
            <input
              type="text"
              onChange={(e) => {
                setProductData({ ...productData, name: e.target.value });
              }}
              value={productData.name}
              className="p-2 rounded-lg w-full leading-9 shadow-xl xl:w-96"
            />
            <input
              type="text"
              onChange={(e) => {
                setProductData({ ...productData, desc: e.target.value });
              }}
              value={productData.desc}
              className="p-2 rounded-lg w-full leading-9 shadow-xl xl:w-96"
            />

            <input
              type="number"
              onChange={(e) => {
                setProductData({ ...productData, price: e.target.value as any });
              }}
              value={productData.price}
              className="p-2 rounded-lg w-full leading-9 shadow-xl xl:w-96"
            />
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setProductData({ ...productData, img: e.target.files[0] });
                }
              }}
              className="bg-white p-3 rounded-lg shadow-xl"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-300 hover:bg-blue-400 transition-all p-4 w-36 rounded-xl text-xl font-bold shadow-xl"
          >
            Submit
          </button>
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
            <button onClick={() => deleteProduct()} className="bg-red-400 hover:bg-red-500 transition-all p-4 w-36 rounded-xl text-xl font-bold shadow-xl">Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
}

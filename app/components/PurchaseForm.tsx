"use client";
import { addDoc } from "firebase/firestore";
import { useState } from "react";
import { purchasesRef } from "../db/firebase";
interface PurchaseFormProps {
  purchaseFormShow: boolean;
  setPurchaseFormShow: React.Dispatch<React.SetStateAction<boolean>>;
  productNameProp: string;
}
interface CustomerData {
  name: string;
  phoneNum: string;
  address: string;
  productName: string;
}
export default function PurchaseForm({
  purchaseFormShow,
  setPurchaseFormShow,
  productNameProp,
}: PurchaseFormProps) {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    phoneNum: "",
    address: "",
    productName: productNameProp,
  });
  const addCustomer = () => {
    addDoc(purchasesRef, customerData);
  };
  return (
    <main
      className={`w-screen h-screen border-0 flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 backdrop-brightness-75 ${
        purchaseFormShow ? "flex" : "hidden"
      }`}
    >
      <div className="bg-white p-5 flex flex-col items-start gap-5 shadow-2xl rounded-3xl">
        <button
          type="button"
          onClick={() => setPurchaseFormShow(false)}
          className="bg-ascent text-background py-2 px-4 mt-0 rounded-xl hover:scale-105 transition-all"
        >
          X
        </button>
        <div className="flex flex-col items-center justify-center">
          <form
            className="flex flex-col gap-7 border-0 z-50"
            onSubmit={(e) => {
              e.preventDefault();
              addCustomer();
            }}
          >
            <input
              type="text"
              onChange={(e) =>
                setCustomerData({ ...customerData, name: e.target.value })
              }
              required
              className="bg-neutral-200 h-10 rounded-lg placeholder:text-neutral-900 p-2 hover:bg-neutral-300 focus:bg-neutral-400 outline-none transition-all"
              placeholder="Name & Last Name"
            />
            <input
              type="text"
              onChange={(e) =>
                setCustomerData({ ...customerData, phoneNum: e.target.value })
              }
              required
              className="bg-neutral-200 h-10 rounded-lg placeholder:text-neutral-900 p-2 hover:bg-neutral-300 focus:bg-neutral-400 outline-none transition-all"
              placeholder="Phone Number"
            />
            <input
              type="text"
              onChange={(e) =>
                setCustomerData({ ...customerData, address: e.target.value })
              }
              required
              className="bg-neutral-200 h-10 rounded-lg placeholder:text-neutral-900 p-2 hover:bg-neutral-300 focus:bg-neutral-400 outline-none transition-all"
              placeholder="Home Address"
            />
            <div className="flex flex-col justify-center items-center">
              <button
                type="submit"
                className="bg-ascent text-background w-max p-3 rounded-xl hover:scale-105 active:scale-90 transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

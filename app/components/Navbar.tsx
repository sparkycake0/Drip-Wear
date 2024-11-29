"use client";

import Image from "next/image";
import Link from "next/link";
import drip from "./crop.png";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/firebase";
interface ProfileData {
  email: string;
  name: string;
  photoURL: string;
}
export default function Navbar() {
  const [profileData, setProfileData] = useState<ProfileData>({
    email: "",
    name: "",
    photoURL: "",
  });
  const [account, setAccount] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setProfileData({
        email: user?.email ?? "example@email.com",
        name: user?.displayName ?? "Guest",
        photoURL: user?.photoURL ?? "No Photo",
      });
    });
  }, []);
  return (
    <>
      <div className="mb-24"></div>
      <main className="w-screen bg-white p-2 shadow-2xl flex justify-between px-12 fixed">
        <div>
          <Image alt="asd" src={drip} width={90} />
        </div>
        <div className="flex gap-6 items-center text-background">
          <Link
            href={"/"}
            className="bg-ascent p-2 rounded-md transition-all duration-150 hover:scale-105"
          >
            <h1>Products</h1>
          </Link>
          <button
            onClick={() => setAccount(!account)}
            className="bg-ascent p-2 rounded-md transition-all duration-150 hover:scale-105 cursor-pointer"
          >
            <h1>Account</h1>
          </button>
        </div>
        <div className="hidden lg:flex"></div>
      </main>
      <div
        className={`bg-ascent text-background absolute bottom-2 right-2 w-max h-max p-4 rounded-md border-secondary border-2 flex flex-col items-center gap-6 transition-all duration-200 ${account ? "translate-x-0" : "translate-x-full"}`}
      >
        <img src={profileData.photoURL} alt="asd" className="rounded-full" />
        <div>
          <h1>{profileData.name}</h1>
          <h1>{profileData.email}</h1>
        </div>
        <div className="flex w-full justify-center">
          <button className="bg-red-500 rounded-md p-2">Sign Out</button>
        </div>
      </div>
    </>
  );
}

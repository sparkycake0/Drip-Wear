"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../db/firebase";
import shop from "../assets/grocery-store.png"
interface ProfileData {
  username: string;
  email: string;
  profilePic: string;
}
export default function AccountPage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "",
    email: "",
    profilePic: "",
  });
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setProfileData({
        username: user?.displayName as any,
        email: user?.email as any,
        profilePic: user?.photoURL as any,
      });
    });
  }, []);
  const signOutfunc = () => {
    signOut(auth);
  };
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center border-2 ">
      <div className="flex flex-col items-center justify-center shadow-2xl border-0 rounded-3xl p-0 bg-white gap-4">
        <div className="flex flex-col items-center justify-center w-full rounded-tl-2xl rounded-tr-2xl ">
          <h1 className="text-4xl font-bold shadow-xl border-0 w-full flex items-center justify-center rounded-tl-2xl rounded-tr-2xl p-5">{profileData.username}</h1>
        </div>
        <h1 className="p-8 text-2xl">{profileData.email}</h1>
        <img src={profileData.profilePic} width={150} className="rounded-3xl shadow-2xl"/>
        <button onClick={() => signOutfunc()} className="m-5 p-3 text-2xl bg-red-400 rounded-xl ">Sign Out</button>
      </div>
      
    </main>
  );
}

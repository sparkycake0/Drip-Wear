"use client";
import { googleProvider, auth } from "../db/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import google from "./search.png" 
import Image from "next/image";
export default function Login() {
  const router = useRouter();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then(() => router.push("/"));
  };
  return (
    <main className="w-screen h-screen flex items-center justify-center ">
      <form className="border-0 p-5 flex flex-col items-center justify-center gap-5 rounded-2xl shadow-2xl">
        <h1 className="text-2xl">Log in with</h1>
        <button
          onClick={(e) => {
            e.preventDefault();
            signInWithGoogle();
          }}
          className="border-0 p-3 w-full flex flex-row items-center justify-center gap-3 rounded-xl shadow-xl bg-blue-300 hover:bg-blue-400 transition-all duration-300"
        >
          <Image src={google} width={35}/><h1 className="text-lg font-bold  h-full">Google</h1>
        </button>
      </form>
    </main>
  );
}

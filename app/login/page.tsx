"use client";
import { googleProvider, auth } from "../db/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import google from "./search.png";
import Image from "next/image";
export default function Login() {
  const router = useRouter();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then(() => router.push("/"));
  };
  return (
    <main>
      <form>
        <h1>Log in with</h1>
        <button
          onClick={(e) => {
            e.preventDefault();
            signInWithGoogle();
          }}
        >
          <Image alt="asd" src={google} width={35} />
          <h1>Google</h1>
        </button>
      </form>
    </main>
  );
}

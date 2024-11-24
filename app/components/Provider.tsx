"use client";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/firebase";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Provider() {
  const router = useRouter();
  const url = usePathname();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (url === "/login") {
          router.push("/");
        }
      } else {
        if (url !== "/login") {
          router.push("/login");
        }
      }
      console.log(user);
    });
  }, []);

  return <main></main>;
}

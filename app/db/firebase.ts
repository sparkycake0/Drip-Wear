import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD074e-1TsL3eotVuX35i0gzTrsjOO9PPQ",
  authDomain: "g2pgg---dimke.firebaseapp.com",
  projectId: "g2pgg---dimke",
  storageBucket: "g2pgg---dimke.appspot.com",
  messagingSenderId: "1079850195291",
  appId: "1:1079850195291:web:1d441274b24ad69bfd227e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const productsRef = collection(firestore, "products");
export const purchasesRef = collection(firestore, "purchases");

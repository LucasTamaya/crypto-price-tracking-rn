import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_API_KEY } from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "crypto-mania-rn.firebaseapp.com",
  projectId: "crypto-mania-rn",
  storageBucket: "crypto-mania-rn.appspot.com",
  messagingSenderId: "408535638425",
  appId: "1:408535638425:web:9bc77fab5398988fd2b308",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

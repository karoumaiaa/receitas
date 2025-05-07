
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOPp6aaKIuJyJR6a32OTzEDZzSYin9-xg",
  authDomain: "receita-b2314.firebaseapp.com",
  projectId: "receita-b2314",
  storageBucket: "receita-b2314.firebasestorage.app",
  messagingSenderId: "881810922392",
  appId: "1:881810922392:web:58a53f3694fb71ef3ca9ed",
  measurementId: "G-V03WFG3T6M"
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
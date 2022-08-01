// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgqM_9zBjr8LKX66L90Jy25Dwxb1cDBKI",
  authDomain: "trivia-e2c09.firebaseapp.com",
  projectId: "trivia-e2c09",
  storageBucket: "trivia-e2c09.appspot.com",
  messagingSenderId: "329875815878",
  appId: "1:329875815878:web:9875a1850c8252805fc6c7",
  measurementId: "G-CQ31ZRPVKJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFireStore(app);

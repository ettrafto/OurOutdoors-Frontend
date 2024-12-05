// src/shared/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0FSS2DR47EtpKm76DeVf_gjmPLa6zBes",
  authDomain: "ouroutdoors-96df4.firebaseapp.com",
  projectId: "ouroutdoors-96df4",
  storageBucket: "ouroutdoors-96df4.firebasestorage.app",
  messagingSenderId: "121548791737",
  appId: "1:121548791737:web:310768eae77fd2dca02068",
  measurementId: "G-LWLRXBRGG8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6tM37pnC1PP8ARVqr-EFRPetxz9_zVYo",
  authDomain: "lola-fe-s-laundry-shop.firebaseapp.com",
  databaseURL: "https://lola-fe-s-laundry-shop-default-rtdb.firebaseio.com", 
  projectId: "lola-fe-s-laundry-shop",
  storageBucket: "lola-fe-s-laundry-shop.appspot.com",
  messagingSenderId: "182331860469",
  appId: "1:182331860469:web:1c0983f7a883532bfdecbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const database = getDatabase(app);
export const auth = getAuth(app);

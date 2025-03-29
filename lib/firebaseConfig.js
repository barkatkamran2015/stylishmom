// src/lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import getAuth for Firebase Authentication

const firebaseConfig = {
  apiKey: "AIzaSyBxvhugc4PAxKhtT4A3_bkkn93gAqvlwUk",
  authDomain: "stylishmama-2f5ce.firebaseapp.com",
  projectId: "stylishmama-2f5ce",
  storageBucket: "stylishmama-2f5ce.firebasestorage.app",
  messagingSenderId: "807674812157",
  appId: "1:807674812157:web:02e4fb3fab7ed792a75094",
  measurementId: "G-W6CQVJFWC5",
};

let app;
let db;
let auth; // Add auth variable

// Initialize Firebase, Firestore, and Auth only in the browser
if (typeof window !== "undefined") {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app); // Initialize Firebase Auth
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}

export { app, db, auth }; // Export auth along with app and db
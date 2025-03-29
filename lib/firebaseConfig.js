// src/lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Load Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validate that all required config values are present
const requiredConfigKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
];
const missingKeys = requiredConfigKeys.filter((key) => !firebaseConfig[key]);
if (missingKeys.length > 0) {
  console.error("Missing Firebase config keys:", missingKeys);
}

let app;
let db;
let auth;

// Initialize Firebase, Firestore, and Auth only in the browser
if (typeof window !== "undefined") {
  try {
    console.log("Initializing Firebase with config:", firebaseConfig);
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    console.log("Firebase Auth initialized successfully:", auth);
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    // Optionally, you can throw the error to fail fast in development
    if (process.env.NODE_ENV === "development") {
      throw new Error(`Firebase initialization failed: ${error.message}`);
    }
  }
}

export { app, db, auth };

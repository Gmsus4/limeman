import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIERBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIERBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIERBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIERBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIERBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIERBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, firestore, storage};
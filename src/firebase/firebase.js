import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDGYiFvF3GvjncyaJf-I0QrhTIeHJRk57k",
  authDomain: "limeapp-270ab.firebaseapp.com",
  projectId: "limeapp-270ab",
  storageBucket: "limeapp-270ab.appspot.com",
  messagingSenderId: "295730229853",
  appId: "1:295730229853:web:3d9042ced7e03a549653b4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, firestore, storage};
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: replace these placeholder values with your real Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDmoOFBAN-EN0VR-Rlp4G3NZ1QcCNchbxQ",
  authDomain: "healing-minds-f2f57.firebaseapp.com",
  projectId: "healing-minds-f2f57",
  storageBucket: "healing-minds-f2f57.firebasestorage.app",
  messagingSenderId: "60091148194",
  appId: "1:60091148194:web:aa4e8c9460e907c96c34fb",
  measurementId: "G-8ZJ03GE89P"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

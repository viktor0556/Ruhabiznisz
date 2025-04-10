import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDTpOWRAyujPoGrEHxTn6EXgUo-z3huolQ",
  authDomain: "ruhabiznisz-474b8.firebaseapp.com",
  projectId: "ruhabiznisz-474b8",
  storageBucket: "ruhabiznisz-474b8.firebasestorage.app",
  messagingSenderId: "638987047775",
  appId: "1:638987047775:web:e503322b84f2236681dcea"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { db, storage };

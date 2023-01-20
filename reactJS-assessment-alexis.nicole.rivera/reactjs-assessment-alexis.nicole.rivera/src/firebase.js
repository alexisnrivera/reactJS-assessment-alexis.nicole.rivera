
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDiS6WMQnBf-OV9Y7_CvrZP6Sr2iHryUw",
  authDomain: "fir-books-a11cc.firebaseapp.com",
  projectId: "fir-books-a11cc",
  storageBucket: "fir-books-a11cc.appspot.com",
  messagingSenderId: "562228625109",
  appId: "1:562228625109:web:552736788d5c16213c2c5c",
  measurementId: "G-4W4SFN41HX"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiDkHFQhh6ikJ04cEcGBtsWwby02im5Vk",
  authDomain: "trip-planner-d80b0.firebaseapp.com",
  projectId: "trip-planner-d80b0",
  storageBucket: "trip-planner-d80b0.firebasestorage.app",
  messagingSenderId: "920435020795",
  appId: "1:920435020795:web:dd04377fad1f387597715e",
  measurementId: "G-KK17GQZHFC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);
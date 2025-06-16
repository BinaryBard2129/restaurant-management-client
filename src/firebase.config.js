// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPYYzNgv4921TSCf0mOh-rPaztBh4ZOW8",
  authDomain: "restaurant-management-8389e.firebaseapp.com",
  projectId: "restaurant-management-8389e",
  storageBucket: "restaurant-management-8389e.firebasestorage.app",
  messagingSenderId: "741518632418",
  appId: "1:741518632418:web:c78e1bca6b0fc5589885bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
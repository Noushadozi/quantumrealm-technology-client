// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNcey9uan3UJ4lqTazS0DibWEtWr4X_Vo",
  authDomain: "employee-management-31485.firebaseapp.com",
  projectId: "employee-management-31485",
  storageBucket: "employee-management-31485.appspot.com",
  messagingSenderId: "786217640488",
  appId: "1:786217640488:web:1332fb06dee6d5af520b1d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEenmQ5vtkSth9xqz9NbjnHfIieKy_3OY",
  authDomain: "quantamrealm-technology.firebaseapp.com",
  projectId: "quantamrealm-technology",
  storageBucket: "quantamrealm-technology.appspot.com",
  messagingSenderId: "1002331107414",
  appId: "1:1002331107414:web:27195d7da5d2d672becbf7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAa2RFn93FODctQfW_pIoZ95H9TZfHLx5E",
  authDomain: "js230214-7830a.firebaseapp.com",
  projectId: "js230214-7830a",
  storageBucket: "js230214-7830a.appspot.com",
  messagingSenderId: "63681232129",
  appId: "1:63681232129:web:dc8e523d186b08ddde2f00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export { auth, provider };
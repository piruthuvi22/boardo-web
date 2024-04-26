// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbrSdVtg19W1Scf5ZpObCriHoFm18Z6Zw",
  authDomain: "boardo-admin.firebaseapp.com",
  projectId: "boardo-admin",
  storageBucket: "boardo-admin.appspot.com",
  messagingSenderId: "611550468478",
  appId: "1:611550468478:web:f057c66c0aa81c64c1bb2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7rr7DiyBSGysWEyCIIrEM-ogwuNI_84g",
  authDomain: "boardo-9985d.firebaseapp.com",
  projectId: "boardo-9985d",
  storageBucket: "boardo-9985d.appspot.com",
  messagingSenderId: "870090502776",
  appId: "1:870090502776:web:1b13cfebdf66270b30b38d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
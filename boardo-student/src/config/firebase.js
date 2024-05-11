// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7rr7DiyBSGysWEyCIIrEM-ogwuNI_84g",
  authDomain: "boardo-9985d.firebaseapp.com",
  projectId: "boardo-9985d",
  storageBucket: "boardo-9985d.appspot.com",
  messagingSenderId: "870090502776",
  appId: "1:870090502776:web:1b13cfebdf66270b30b38d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);

export default auth;
// export const messaging = getMessaging(app);

// function requestPermission() {
//   console.log("Requesting permission...");
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       console.log("Notification permission granted.");
//     }
//   });
// }

// getToken(messaging, {
//   vapidKey:
//     "BJt3dolGHMC0qfyxzvYyNaMA9TBs1olhZ0Kt4wL4y-jCSJpbkEsCJb2ieBORu2BxymZVD2YZC7C-cQy_qFzKpMs",
// })
//   .then((currentToken) => {
//     if (currentToken) {
//       // Send the token to your server and update the UI if necessary
//       console.log("currentToken", currentToken);
//       // ...
//     } else {
//       // Show permission request UI
//       requestPermission();
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//       // ...
//     }
//   })
//   .catch((err) => {
//     console.log("An error occurred while retrieving token. ", err);
//     // ...
//   });

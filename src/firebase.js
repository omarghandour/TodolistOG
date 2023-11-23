// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEClX2-_UMGsbga09Za2_me6SEw82wnPE",
  authDomain: "ogtodo1.firebaseapp.com",
  projectId: "ogtodo1",
  storageBucket: "ogtodo1.appspot.com",
  messagingSenderId: "315466259149",
  appId: "1:315466259149:web:ece0eb205143187ba8e784",
  measurementId: "G-Z0L1M60LR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
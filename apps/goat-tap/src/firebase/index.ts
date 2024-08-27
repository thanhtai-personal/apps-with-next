// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJpn7r5grF3loz-t2X36kvVrAqT59r_YE",
  authDomain: "goattap.firebaseapp.com",
  projectId: "goattap",
  storageBucket: "goattap.appspot.com",
  messagingSenderId: "162231324532",
  appId: "1:162231324532:web:635fea3dfb15b035662621",
  measurementId: "G-DVYT8CQKQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
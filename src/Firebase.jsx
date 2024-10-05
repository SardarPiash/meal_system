// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzNmji8CCDPnl1DJxpBCvdgYs_NUmVJUU",
  authDomain: "meal-system-23cfe.firebaseapp.com",
  databaseURL: "https://meal-system-23cfe-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "meal-system-23cfe",
  storageBucket: "meal-system-23cfe.appspot.com",
  messagingSenderId: "256953033599",
  appId: "1:256953033599:web:bdb2ab7ea8fec546faf04a",
  measurementId: "G-YBZ2HRB3SQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const database = getDatabase(app)

export {auth,database}
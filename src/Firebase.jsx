import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { getDatabase } from "firebase/database";


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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export {app, auth, database };

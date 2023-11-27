import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAq2LhqCLegg6o3H49AbRfWFD9yUsVs53Q",
  authDomain: "react-firebase-system.firebaseapp.com",
  projectId: "react-firebase-system",
  storageBucket: "react-firebase-system.appspot.com",
  messagingSenderId: "864505214611",
  appId: "1:864505214611:web:f50ef3eeac3b005f467f66"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);


export default fire;
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBb2azA8y95UpbqITXw328NmaEEC2nAolk",
  authDomain: "filefolio-dev-89ea6.firebaseapp.com",
  projectId: "filefolio-dev-89ea6",
  storageBucket: "filefolio-dev-89ea6.appspot.com",
  messagingSenderId: "157263356062",
  appId: "1:157263356062:web:0b38ddc1d84e70b5dc9b8f",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;

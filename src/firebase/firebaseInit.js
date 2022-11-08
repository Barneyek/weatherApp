import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_CONFIG,
  authDomain: "weatherapp-c4f2e.firebaseapp.com",
  projectId: "weatherapp-c4f2e",
  storageBucket: "weatherapp-c4f2e.appspot.com",
  appId: "1:180435526706:web:d188741f90b09439b2482b",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection("users");

export {
  auth,
  db,
  usersCollection
};

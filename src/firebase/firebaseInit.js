import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_CONFIG,
  authDomain: "weatherapp-c4f2e.firebaseapp.com",
  projectId: "weatherapp-c4f2e",
  storageBucket: "weatherapp-c4f2e.appspot.com",
  messagingSenderId: "180435526706",
  appId: "1:180435526706:web:d188741f90b09439b2482b",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();

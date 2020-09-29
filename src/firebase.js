// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmhc9XE5eCwvUY9a5FYkanUE4mL_mB9jw",
  authDomain: "messenger-clone-80558.firebaseapp.com",
  databaseURL: "https://messenger-clone-80558.firebaseio.com",
  projectId: "messenger-clone-80558",
  storageBucket: "messenger-clone-80558.appspot.com",
  messagingSenderId: "300933312133",
  appId: "1:300933312133:web:40d63a7561895906a843ec",
  measurementId: "G-SVE1EQRPE5",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };

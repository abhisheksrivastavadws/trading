// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_atfSVkK6n5YtKoNwUvVJfZH_K5BDxCQ",
    authDomain: "tradingwithroy-ea2fd.firebaseapp.com",
    projectId: "tradingwithroy-ea2fd",
    // storageBucket: "tradingwithroy-ea2fd.appspot.com",
    messagingSenderId: "166228950366",
    appId: "1:166228950366:web:c1aeeb6f9f719c1dace3cf",
    measurementId: "G-EKYXWXS4PR"
  };

  let firebase = initializeApp(firebaseConfig);
let auth = getAuth(firebase);
const db = getFirestore(firebase);
export { auth, firebase, db };

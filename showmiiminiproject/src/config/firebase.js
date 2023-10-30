// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp45rm1KnRpHF-JNgPDp_aNr0wZVLkisY",
  authDomain: "showmii-e0739.firebaseapp.com",
  databaseURL: "https://showmii-e0739-default-rtdb.firebaseio.com",
  projectId: "showmii-e0739",
  storageBucket: "showmii-e0739.appspot.com",
  messagingSenderId: "365711264431",
  appId: "1:365711264431:web:4d4c81b9b534d38aeda25a",
  measurementId: "G-H1MP21Z7FB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
export const db = getDatabase()
export const showmiistorage = getStorage()

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBioVVEQcIQaPSDmKYTUxNyrTJ9v4fqs7w",
  authDomain: "discord-clone-d3d2e.firebaseapp.com",
  projectId: "discord-clone-d3d2e",
  storageBucket: "discord-clone-d3d2e.appspot.com",
  messagingSenderId: "632402803100",
  appId: "1:632402803100:web:6fbe917049d022da6e7059"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}
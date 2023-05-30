// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGa7nY54x6YojZ5gdhluC71U50OsMHXvg",
  authDomain: "dvtcream.firebaseapp.com",
  projectId: "dvtcream",
  storageBucket: "dvtcream.appspot.com",
  messagingSenderId: "834117377959",
  appId: "1:834117377959:web:f900fdf76f7145c697a082",
  measurementId: "G-ZSRVB65KDB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

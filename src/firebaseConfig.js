// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


//import { getAnalytics } from "firebase/analytics"; 
//TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3EzVP8crpOBVC_h5cErpQka1vqopZCnc",
  authDomain: "appointment-lite-dd27f.firebaseapp.com",
  projectId: "appointment-lite-dd27f",
  storageBucket: "appointment-lite-dd27f.appspot.com",
  messagingSenderId: "923912748945",
  appId: "1:923912748945:web:8fe96e7f6bf22123fa2430",
  measurementId: "G-BP175ZPS1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireStoreDataBase = getFirestore(app);

export default fireStoreDataBase;
//const analytics = getAnalytics(app);
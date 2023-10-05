// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCV1MjvDA9_C29FLDvzAQGdG5FuNgoNXow",
	authDomain: "netflix-app-776cb.firebaseapp.com",
	projectId: "netflix-app-776cb",
	storageBucket: "netflix-app-776cb.appspot.com",
	messagingSenderId: "1020196162757",
	appId: "1:1020196162757:web:32eb6108e4ced45d5f34ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

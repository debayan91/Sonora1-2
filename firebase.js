import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAJI6qkR3RqsXkb1XW0XCOYBoLBm6c-N24",
  authDomain: "sonora-339a4.firebaseapp.com",
  projectId: "sonora-339a4",
  storageBucket: "sonora-339a4.firebasestorage.app",
  messagingSenderId: "934837373302",
  appId: "1:934837373302:web:773967eaf0981c2f011257"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); 
const db = getFirestore(app);
export { auth, googleProvider, db }; 
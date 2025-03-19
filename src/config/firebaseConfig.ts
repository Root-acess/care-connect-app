import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Use getAuth instead of initializeAuth
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCXR_LbeYcL6mIaXa3JB4weoiscC03UdHg",
  authDomain: "blood-cap.firebaseapp.com",
  databaseURL: "https://blood-cap-default-rtdb.firebaseio.com",
  projectId: "blood-cap",
  storageBucket: "blood-cap.appspot.com",
  messagingSenderId: "470521911608",
  appId: "1:470521911608:web:5467de4abb5124839509cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth (defaults to memory persistence in React Native)
const auth = getAuth(app);

// Initialize Realtime Database
const database = getDatabase(app);

// Initialize Firestore
const firestore = getFirestore(app);

export { auth, database, firestore };
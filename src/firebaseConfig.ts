import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBjgH-iCdgmqfHKlLkskTDkJwup0fq2FBY",
    authDomain: "famtree-dc8d5.firebaseapp.com",
    projectId: "famtree-dc8d5",
    storageBucket: "famtree-dc8d5.firebasestorage.app",
    messagingSenderId: "351935041156",
    appId: "1:351935041156:web:aed72d4e6511f8a68c7cd1"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

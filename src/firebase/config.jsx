import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBpTqaIuVucFcUVUdGhA2WDrl90mJs5Pv8",
    authDomain: "miniblog-b3c2a.firebaseapp.com",
    projectId: "miniblog-b3c2a",
    storageBucket: "miniblog-b3c2a.firebasestorage.app",
    messagingSenderId: "27984223344",
    appId: "1:27984223344:web:0213636585179ebc6928b5"
};

const app = initializeApp(firebaseConfig);

//chamando banco de dados
const db = getFirestore()

export { db }
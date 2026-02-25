import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
        apiKey: "AIzaSyASe5PG8XvqQvN4aSJZTvkDCRJgQCdLRRY",
        authDomain: "linkedinclone-ac.firebaseapp.com",
        projectId: "linkedinclone-ac",
        storageBucket: "linkedinclone-ac.appspot.com",
        messagingSenderId: "290656847761",
        appId: "1:290656847761:web:699a6d8f40715cc2a23c30"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

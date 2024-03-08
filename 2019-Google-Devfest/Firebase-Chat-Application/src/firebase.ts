import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC4Xl3Pg2PtAZ4LfG2wf7sBfQC3gPS4vVA",
  authDomain: "project-chatton.firebaseapp.com",
  databaseURL: "https://project-chatton.firebaseio.com",
  projectId: "project-chatton",
  storageBucket: "",
  messagingSenderId: "700813242506",
  appId: "1:700813242506:web:6acefa5544802de9b43d73"
};

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

export const Collections = {
  UsernameDB : db.collection('username')
};
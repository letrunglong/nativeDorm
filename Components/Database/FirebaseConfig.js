import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC8iHHV0biyUNBFRXbwd4H-865dQDZCrzk",
  authDomain: "project-3a724.firebaseapp.com",
  databaseURL: "https://project-3a724.firebaseio.com",
  projectId: "project-3a724",
  storageBucket: "project-3a724.appspot.com",
  messagingSenderId: "180133320311",
  appId: "1:180133320311:web:7e670087a054ba5c701872",
  measurementId: "G-0CDWWHNS0J"
};
  // Initialize Firebase
  export const firebaseApp = firebase.initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxZEb2liIgZCDq0HgyUSHKXY8-uIw3d7c",
  authDomain: "chat-app-68204.firebaseapp.com",
  projectId: "chat-app-68204",
  storageBucket: "chat-app-68204.appspot.com",
  messagingSenderId: "1098658851659",
  appId: "1:1098658851659:web:6e6439f3cd981547f056ce",
  measurementId: "G-2LGQZMD5L0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getAnalytics(app);

export default db;
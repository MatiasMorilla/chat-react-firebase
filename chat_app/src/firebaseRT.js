import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCxZEb2liIgZCDq0HgyUSHKXY8-uIw3d7c",
  authDomain: "chat-app-68204.firebaseapp.com",
  databaseURL: "https://chat-app-68204-default-rtdb.firebaseio.com",
  projectId: "chat-app-68204",
  storageBucket: "chat-app-68204.appspot.com",
  messagingSenderId: "1098658851659",
  appId: "1:1098658851659:web:6e6439f3cd981547f056ce",
  measurementId: "G-2LGQZMD5L0"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;

console.log(db);


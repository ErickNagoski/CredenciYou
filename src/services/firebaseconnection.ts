import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDjYVkx11a6gL1ST5hvaDPRzNPH-P32wmI",
    authDomain: "credenciyou.firebaseapp.com",
    databaseURL: "https://credenciyou-default-rtdb.firebaseio.com",
    projectId: "credenciyou",
    storageBucket: "credenciyou.appspot.com",
    messagingSenderId: "183737826420",
    appId: "1:183737826420:web:a0f08474f3a21595b6e521",
    measurementId: "G-6C4JJXFRM3"
  };
  
  // Initialize Firebase
  
  if(! firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }else{
    console.warn("Já existe uma conexão")
  } 
  
   export default firebase;
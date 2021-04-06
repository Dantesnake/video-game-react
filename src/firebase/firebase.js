import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/database'

 var firebaseConfig = {
    apiKey: "AIzaSyA9AMpTIojXSZtfBXHVE7uX_ApWs-3UvW0",
    authDomain: "react-games-cfae3.firebaseapp.com",
    databaseURL: "https://react-games-cfae3-default-rtdb.firebaseio.com",
    projectId: "react-games-cfae3",
    storageBucket: "react-games-cfae3.appspot.com",
    messagingSenderId: "879493040896",
    appId: "1:879493040896:web:d1b2515c5bab3c7e0fc1e5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  const provider = new firebase.auth.GoogleAuthProvider();

  const authFirebase = firebase

  const database = firebase.database();
  
export {storage,provider,authFirebase,database}
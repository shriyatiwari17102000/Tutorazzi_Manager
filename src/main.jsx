import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import ScrollToTop from './UI/ScrollToTop/ScrollToTop.jsx'

import firebase from 'firebase'
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCmAe-RQhOhZcrUfZNbwcqP2fmj6N3xPPs",
//   authDomain: "studentchat-2975f.firebaseapp.com",
//   projectId: "studentchat-2975f",
//   storageBucket: "studentchat-2975f.appspot.com",
//   messagingSenderId: "633660660792",
//   appId: "1:633660660792:web:afb0248ce3ec5e1b1f9acd",
//   measurementId: "G-T0JZQB68GM"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAcef6uAvsWX2pU4cHV6l68s3yRe8tuxB8",
  authDomain: "tutproject-7040a.firebaseapp.com",
  projectId: "tutproject-7040a",
  storageBucket: "tutproject-7040a.appspot.com",
  messagingSenderId: "1061733972103",
  appId: "1:1061733972103:web:6616cd16552af672fce022"
};

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ScrollToTop />
    <App />
  </Router>,
)
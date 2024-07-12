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
//   apiKey: "AIzaSyA_XuMVndD6oqNn92AVvgnHlN_vMWikDJk",
//   authDomain: "group-chat-f4204.firebaseapp.com",
//   projectId: "group-chat-f4204",
//   storageBucket: "group-chat-f4204.appspot.com",
//   messagingSenderId: "1083346403521",
//   appId: "1:1083346403521:web:7d4f3499a40e3f46221440"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDyREMCdZ6RuaCn9yaAjjDRU5T8cFGkGOs",
  authDomain: "new-grp.firebaseapp.com",
  projectId: "new-grp",
  storageBucket: "new-grp.appspot.com",
  messagingSenderId: "283418664535",
  appId: "1:283418664535:web:de9eddbea04038580dcd12"
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
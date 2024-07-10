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
  apiKey: "AIzaSyCIe2RSwPZoxGWxnk0EOtaXzD1Lgg_SMGA",
  authDomain: "group-new-577c6.firebaseapp.com",
  projectId: "group-new-577c6",
  storageBucket: "group-new-577c6.appspot.com",
  messagingSenderId: "982423893299",
  appId: "1:982423893299:web:2d3114e9bdad1253a77a46"
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
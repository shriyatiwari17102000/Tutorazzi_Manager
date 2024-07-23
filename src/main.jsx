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
  apiKey: "AIzaSyDnYrMadq3wJ-4xBVb3YexBUSi0GkP2psQ",
  authDomain: "group-new-chat.firebaseapp.com",
  projectId: "group-new-chat",
  storageBucket: "group-new-chat.appspot.com",
  messagingSenderId: "232419380136",
  appId: "1:232419380136:web:f003da4781e7819bc7eb9d"
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
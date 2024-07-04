import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/compat/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDisZzEY9mKWLaW410zqW2p_zqh-EH4o8w",
  authDomain: "petconnect-b3f73.firebaseapp.com",
  projectId: "petconnect-b3f73",
  storageBucket: "petconnect-b3f73.appspot.com",
  messagingSenderId: "157631664500",
  appId: "1:157631664500:web:ec9f5b21865503be9a9c21"
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

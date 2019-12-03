import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import * as firebase from "firebase"
// import './firebase-messaging-sw'

ReactDOM.render(<App />, document.getElementById('root'));

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBtH3XCGJLN5NQmR0DUHuUSYvoo9JmvNwA",
  authDomain: "stopwatch-f179e.firebaseapp.com",
  databaseURL: "https://stopwatch-f179e.firebaseio.com",
  projectId: "stopwatch-f179e",
  storageBucket: "stopwatch-f179e.appspot.com",
  messagingSenderId: "497007181926",
  appId: "1:497007181926:web:45537e6b8da7ba18972da7",
  measurementId: "G-FNHTB9F9EL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

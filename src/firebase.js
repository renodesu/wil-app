import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"

const app = firebase.initializeApp ({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  });

export const db = app.database();
export const auth = app.auth();
export default app;

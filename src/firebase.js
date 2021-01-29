import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"

const app = firebase.initializeApp ({
    apiKey: "AIzaSyC5uizu4AhJlldqohiIj4hwSBPhpt8vnQs",
    authDomain: "sa-app-da971.firebaseapp.com",
    projectId: "sa-app-da971",
    storageBucket: "sa-app-da971.appspot.com",
    messagingSenderId: "165767989141",
    appId: "1:165767989141:web:a8749db1930345f384989c",
    measurementId: "G-ND736VX5CW"
  });

export const db = app.database();
export const auth = app.auth();
export default app;
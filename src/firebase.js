import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp ({
    apiKey: "AIzaSyCXKlTrHIo7wRymI0PtFRiGwhVjO7Ly3H8",
    authDomain: "wil-app-63c1f.firebaseapp.com",
    databaseURL: "https://wil-app-63c1f.firebaseio.com",
    projectId: "wil-app-63c1f",
    storageBucket: "wil-app-63c1f.appspot.com",
    messagingSenderId: "371248742987",
    appId: "1:371248742987:web:46b1bbffac97010bdf43ce",
    measurementId: "G-QN2HE98VLZ"
  });

export const auth = app.auth();
export default app;
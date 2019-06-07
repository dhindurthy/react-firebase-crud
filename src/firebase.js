import firebase from "firebase";

const config = {
  apiKey: "AIzaSyD9fl5KF_3yWoBoNwSagDHCwdXDNmLC7pw",
  authDomain: "react-fireproj.firebaseapp.com",
  databaseURL: "https://react-fireproj.firebaseio.com",
  projectId: "react-fireproj",
  storageBucket: "react-fireproj.appspot.com",
  messagingSenderId: "691485998368",
  appId: "1:691485998368:web:7d70d78d36ddff9a"
};
// Initialize Firebase
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;

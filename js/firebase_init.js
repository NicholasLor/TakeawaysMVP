// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASTCfSqSSKFMGigMP4tatNgx1QWhVNQCU",
  authDomain: "takeaways-92d16.firebaseapp.com",
  projectId: "takeaways-92d16",
  storageBucket: "takeaways-92d16.appspot.com",
  messagingSenderId: "682210047925",
  appId: "1:682210047925:web:17785162f9424c547d4bfc",
  measurementId: "G-H6NH13YP5Z",
  storageBucket: "gs://takeaways-92d16.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);


export {app, db, storage }
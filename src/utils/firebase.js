// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6i0QKX6COekOVLabpnPbtwC7t2BosDSU",
  authDomain: "netflix-clone-62f89.firebaseapp.com",
  projectId: "netflix-clone-62f89",
  storageBucket: "netflix-clone-62f89.appspot.com",
  messagingSenderId: "268257629260",
  appId: "1:268257629260:web:e1fd36c59c200cb18290e9",
  measurementId: "G-06K979JLXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();

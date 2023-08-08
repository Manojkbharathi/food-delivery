// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDf9940K2ULkRqBOAIaC_4ONOmFOhinlSw',
  authDomain: 'food-delivery-f1cee.firebaseapp.com',
  projectId: 'food-delivery-f1cee',
  storageBucket: 'food-delivery-f1cee.appspot.com',
  messagingSenderId: '105291723738',
  appId: '1:105291723738:web:1b3fd800050ee28ff406e3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };

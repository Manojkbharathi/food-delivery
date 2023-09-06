// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { getApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
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
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  return userDocRef;
};
const storage = getStorage(app);

export { provider, storage, db, app, createUserDocumentFromAuth };

export const auth = getAuth(app);

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBxX-ELGic95zBISISI46VZ0kjfrhW00VI",
  authDomain: "sherlife-13fda.firebaseapp.com",
  projectId: "sherlife-13fda",
  storageBucket: "sherlife-13fda.appspot.com",
  messagingSenderId: "381986274509",
  appId: "1:381986274509:web:015265105bff482f70bd84",
  measurementId: "G-30YLRR3XTS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
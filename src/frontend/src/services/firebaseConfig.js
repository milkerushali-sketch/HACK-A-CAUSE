// Firebase configuration service
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDummyKey",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "aquaguard-demo.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "https://aquaguard-demo.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "aquaguard-demo",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "aquaguard-demo.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

let app, database, auth;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  auth = getAuth(app);
} catch (error) {
  console.warn('Firebase initialization warning (OK for demo mode):', error);
}

export { database, auth };

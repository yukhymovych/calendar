import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyApdIyw2KNGX5abhQAo1KF_U3aJKGhx97k',
  authDomain: 'magnificent-calendar.firebaseapp.com',
  projectId: 'magnificent-calendar',
  storageBucket: 'magnificent-calendar.appspot.com',
  messagingSenderId: '251814553024',
  appId: '1:251814553024:web:a2f51204786404cad29425',
};

const app = initializeApp(firebaseConfig);

export const firebaseDB = getDatabase(app);
export const auth = getAuth();

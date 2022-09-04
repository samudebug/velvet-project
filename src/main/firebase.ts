import { initializeApp } from 'firebase/app';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBWE58kNRanQINPG4P_H4f0HJWbccX5UWg',
  authDomain: 'acesso-med.firebaseapp.com',
  databaseURL: 'https://acesso-med.firebaseio.com',
  projectId: 'acesso-med',
  storageBucket: 'acesso-med.appspot.com',
  messagingSenderId: '57693473',
  appId: '1:57693473:web:27d61bff7023326b',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
connectStorageEmulator(storage, 'localhost', 9199);
export default storage;

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';


// initialize Firebase app
const firebaseConfig = {
  apiKey: "AIzaSyAGmynWFBoq6As2Wd_CJzjkgzXKs3TZGmg",
  authDomain: "tut-database.firebaseapp.com",
  projectId: "tut-database",
  storageBucket: "tut-database.appspot.com",
  messagingSenderId: "718262711626",
  appId: "1:718262711626:web:27b26152d4f682a9ed3db3",
};

// create a storage reference
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const storageRef = ref(storage);
export { storageRef };

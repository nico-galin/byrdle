import { initializeApp } from "firebase/app"
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut as fbSignOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxVrTdxy-unh5lnlwXYJmSuvgzYoOtKLc",
  authDomain: "byrdle.firebaseapp.com",
  databaseURL: "https://byrdle-default-rtdb.firebaseio.com",
  projectId: "byrdle",
  storageBucket: "byrdle.appspot.com",
  messagingSenderId: "94496170587",
  appId: "1:94496170587:web:548eb419327e1176d7557e",
  measurementId: "G-F6THG4P52L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await fbSignInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
    }
};

const signOut = () => {
    fbSignOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    signOut,
  };
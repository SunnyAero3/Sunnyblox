import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB-KDsssN0AZJSTi1lz_F0rY52G9p-Rfqo",
  authDomain: "sunnyblox2011.firebaseapp.com",
  projectId: "sunnyblox2011",
  storageBucket: "sunnyblox2011.firebasestorage.app",
  messagingSenderId: "472680399510",
  appId: "1:472680399510:web:66280e77440550a9cef8b7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// username → fake email
function email(username){
  return username.toLowerCase() + "@sunnyblox.local";
}

// error display
function showError(msg){
  document.getElementById("error").innerText = msg;
}

// SIGN UP
window.signup = async function () {
  try {
    const u = document.getElementById("signupUser").value;
    const p = document.getElementById("signupPass").value;

    const userCred = await createUserWithEmailAndPassword(auth, email(u), p);

    await setDoc(doc(db, "users", userCred.user.uid), {
      username: u,
      bio: "New player",
      createdAt: Date.now()
    });

    window.location.href = "index.html";

  } catch (e) {
    showError(e.message);
  }
};

// LOGIN
window.login = async function () {
  try {
    const u = document.getElementById("loginUser").value;
    const p = document.getElementById("loginPass").value;

    await signInWithEmailAndPassword(auth, email(u), p);

    window.location.href = "index.html";

  } catch (e) {
    showError(e.message);
  }
};

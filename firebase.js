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

// Firebase config
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

// status text
function setStatus(msg, color){
  const el = document.getElementById("status");
  el.innerText = msg;
  el.style.color = color;
}

// SIGN UP
window.signup = async function () {
  try {
    const u = document.getElementById("signupUser").value;
    const p = document.getElementById("signupPass").value;

    setStatus("Creating account...", "black");

    const userCred = await createUserWithEmailAndPassword(auth, email(u), p);

    await setDoc(doc(db, "users", userCred.user.uid), {
      username: u,
      bio: "New player",
      createdAt: Date.now()
    });

    setStatus("Account created successfully!", "green");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 800);

  } catch (e) {
    setStatus("Signup failed: " + e.message, "red");
  }
};

// LOGIN
window.login = async function () {
  try {
    const u = document.getElementById("loginUser").value;
    const p = document.getElementById("loginPass").value;

    setStatus("Logging in...", "black");

    await signInWithEmailAndPassword(auth, email(u), p);

    setStatus("Login successful!", "green");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 800);

  } catch (e) {
    setStatus("Login failed: " + e.message, "red");
  }
};

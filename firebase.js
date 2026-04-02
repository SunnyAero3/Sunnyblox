import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

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

console.log("🔥 Firebase ready");

// 🔥 SIGN UP WITH DUPLICATE CHECK
window.signUp = async function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const status = document.getElementById("status");

  try {
    // 🔍 CHECK IF USERNAME EXISTS
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      status.innerText = "Username already taken ❌";
      status.style.color = "red";
      return;
    }

    // 🔐 CREATE ACCOUNT
    const fakeEmail = username + "@sunnyblox.local";

    const userCred = await createUserWithEmailAndPassword(auth, fakeEmail, password);
    const user = userCred.user;

    // 💾 SAVE USER
    await setDoc(doc(db, "users", user.uid), {
      username: username
    });

    console.log("✅ Account created:", user.uid);

    // 🔁 REDIRECT
    window.location.href = "index.html";

  } catch (err) {
    console.log(err.message);
    status.innerText = err.message;
    status.style.color = "red";
  }
};

// 🔥 LOGIN
window.login = async function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const status = document.getElementById("status");

  try {
    const fakeEmail = username + "@sunnyblox.local";

    const userCred = await signInWithEmailAndPassword(auth, fakeEmail, password);

    console.log("✅ Logged in:", userCred.user.uid);

    // 🔁 REDIRECT
    window.location.href = "index.html";

  } catch (err) {
    console.log(err.message);
    status.innerText = "Invalid login ❌";
    status.style.color = "red";
  }
};

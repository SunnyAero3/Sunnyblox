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

console.log("🔥 Firebase JS loaded");

const firebaseConfig = {
  apiKey: "enter api key",
  authDomain: "sunnyblox2011.firebaseapp.com",
  projectId: "sunnyblox2011",
  storageBucket: "sunnyblox2011.firebasestorage.app",
  messagingSenderId: "472680399510",
  appId: "1:472680399510:web:66280e77440550a9cef8b7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.addEventListener("DOMContentLoaded", () => {

  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");

  // 🔥 SIGN UP
  signupBtn.addEventListener("click", async () => {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const status = document.getElementById("status");

    try {
      console.log("Signup attempt:", username);

      // duplicate check
      const q = query(collection(db, "users"), where("username", "==", username));
      const snap = await getDocs(q);

      if (!snap.empty) {
        status.innerText = "Username already taken ❌";
        return;
      }

      const fakeEmail = username + "@sunnyblox.local";

      const userCred = await createUserWithEmailAndPassword(auth, fakeEmail, password);

      await setDoc(doc(db, "users", userCred.user.uid), {
        username: username
      });

      console.log("Account created");

      window.location.href = "../index.html";

    } catch (err) {
      console.log(err.message);
      status.innerText = err.message;
    }
  });

  // 🔥 LOGIN
  loginBtn.addEventListener("click", async () => {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const status = document.getElementById("status");

    try {

      const fakeEmail = username + "@sunnyblox.local";

      await signInWithEmailAndPassword(auth, fakeEmail, password);

      console.log("Logged in");

      window.location.href = "../index.html";

    } catch (err) {
      console.log(err.message);
      status.innerText = "Invalid login ❌";
    }

  });

});

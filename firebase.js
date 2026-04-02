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

console.log("🔥 firebase.js loaded");

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

// 🔥 WAIT UNTIL PAGE LOADS
window.addEventListener("DOMContentLoaded", () => {

  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");

  signupBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const status = document.getElementById("status");

    try {
      // 🔍 Check duplicate username
      const q = query(collection(db, "users"), where("username", "==", username));
      const snap = await getDocs(q);

      if (!snap.empty) {
        status.innerText = "Username taken ❌";
        status.style.color = "red";
        return;
      }

      const fakeEmail = username + "@sunnyblox.local";

      const userCred = await createUserWithEmailAndPassword(auth, fakeEmail, password);
      const user = userCred.user;

      await setDoc(doc(db, "users", user.uid), {
        username: username
      });

      console.log("✅ Signed up:", user.uid);

      window.location.href = "index.html";

    } catch (err) {
      console.log(err.message);
      status.innerText = err.message;
      status.style.color = "red";
    }
  });

  loginBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const status = document.getElementById("status");

    try {
      const fakeEmail = username + "@sunnyblox.local";

      const userCred = await signInWithEmailAndPassword(auth, fakeEmail, password);

      console.log("✅ Logged in:", userCred.user.uid);

      window.location.href = "index.html";

    } catch (err) {
      console.log(err.message);
      status.innerText = "Invalid login ❌";
      status.style.color = "red";
    }
  });

});

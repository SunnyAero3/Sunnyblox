import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-KDsssN0AZJSTi1lz_Fo...",
  authDomain: "sunnyblox2011.firebaseapp.com",
  projectId: "sunnyblox2011",
  storageBucket: "sunnyblox2011.firebasestorage.app",
  messagingSenderId: "472680399510",
  appId: "1:472680399510:web:66280e77440550a9cef8b7"
};

initializeApp(firebaseConfig);

console.log("Firebase connected 🔥");

// Show on page
document.body.innerHTML = "Firebase WORKING 🔥";

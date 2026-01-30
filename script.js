// Import Firebase modules (v9+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

/* 🔴 PASTE YOUR FIREBASE CONFIG HERE 🔴 */
  const firebaseConfig = {
    apiKey: "AIzaSyBXEUA6m10uR0-pTV4IewWmUxTVU-_8cfs",
    authDomain: "h-h-v1.firebaseapp.com",
    projectId: "h-h-v1",
    storageBucket: "h-h-v1.firebasestorage.app",
    messagingSenderId: "786859596243",
    appId: "1:786859596243:web:f0918769de98fda7f43726",
    measurementId: "G-LGTXYGKNFH"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const loginForm = document.getElementById("loginForm");
const googleBtn = document.getElementById("googleLogin");
const errorMessage = document.getElementById("errorMessage");

// Email/Password Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    errorMessage.textContent = "Please fill all fields.";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      handleAuthError(error);
    });
});

// Google Sign-In
googleBtn.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      handleAuthError(error);
    });
});

// Error Handling
function handleAuthError(error) {
  switch (error.code) {
    case "auth/user-not-found":
      errorMessage.textContent = "User not found.";
      break;
    case "auth/wrong-password":
      errorMessage.textContent = "Incorrect password.";
      break;
    case "auth/invalid-email":
      errorMessage.textContent = "Invalid email address.";
      break;
    default:
      errorMessage.textContent = "Authentication failed. Try again.";
  }
}

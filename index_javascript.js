// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { get, getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as global from './global.js';

//AUTH

const form = document.getElementById('form');
const provider = new GoogleAuthProvider();
document.getElementById('GoogleLoginBtn').addEventListener('click',function(){
  signInWithPopup(global.auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    // The signed-in user info.
    const user = result.user;
    
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
});

// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//  signInWithEmailAndPassword(auth, email, password)
//   .then((user) => {
//       if (user) {
//         alert('sucess');
//       }
//       // ...
//   })
//   .catch((error) => {
//       console.log("error: email or password is incorrect");
//   });
  
// });





document.addEventListener('DOMContentLoaded', function() {
  //ShowNumberOfUsers();
  onAuthStateChanged(global.auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      document.getElementById("GoogleLoginBtn").style.display = "none";
      var localuser =  ref(global.db, 'users/' + uid);
      get(localuser, `users/${uid}`).then((snapshot) => {
        if (snapshot.exists()) {
          console.log("User Exists!");
          var userData = snapshot.val();
          global.SetCurrentUser(new global.User(user.uid, userData["username"], userData["GPA"]));
          GoToDashboard();
      
        }
        else
        {
          global.CreateNewUser(user);
          //showpopup
          GoToDashboard();
      
        }
      });    
      
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
	//window.onmousemove  = function() {myFunction()};
	
	
})


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function GoToDashboard()
{
  sleep(2000).then(() => { window.location.href = "dashboard.html"; });
  
}

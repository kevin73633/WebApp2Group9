// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { get, getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCo6vTfAeWwN4-dVCwcVozAkDSOlNEF_k",
  authDomain: "wad2-b1ba1.firebaseapp.com",
  databaseURL: "https://wad2-b1ba1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wad2-b1ba1",
  storageBucket: "wad2-b1ba1.appspot.com",
  messagingSenderId: "146287601431",
  appId: "1:146287601431:web:845da202141a53e241f952"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service

//REALTIME DATABASE
var currUser = null;
const database = getDatabase(app);
const db = getDatabase();
function CreateNewUser(user) {
  var initialGPA = 0.0;
  set(ref(db, 'users/' + user.uid), {
    username: user.displayName,
    GPA: initialGPA,
  });
  currUser = new User(user.uid, user.displayName, initialGPA);
}
const usersRef = ref(db, 'users/');

class User
{
  constructor(uid, username, gpa) {
    this.uid = uid;
    this.username = username;
    this.gpa = gpa;
  }
}
class Course
{
  constructor(courseCode, courseName) {
    this.courseCode = courseCode;
    this.courseName = this.courseName
  }
}


// onValue(usersRef, (snapshot) => {
//   const data = snapshot.val();
//   //console.log(data);
// });
// onChildAdded(usersRef, (snapshot) => {
//   const data = snapshot.val();
//   //console.log(data["GPA"]);
// });

// onChildChanged(usersRef, (snapshot) => {
//   const data = snapshot.val();
//   //console.log(data["GPA"]);
// });

// onChildRemoved(usersRef, (snapshot) => {
//   const data = snapshot.val();
//   //console.log(data["GPA"]);
// });
//CreateNewUser("Test2");

//AUTH
const auth = getAuth();
const form = document.getElementById('form');
const provider = new GoogleAuthProvider();
document.getElementById('GoogleLoginBtn').addEventListener('click',function(){
  signInWithPopup(auth, provider)
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

function logout () {
  console.log("Logging out");
  signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
  });
}



document.addEventListener('DOMContentLoaded', function() {
  //ShowNumberOfUsers();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      document.getElementById("GoogleLoginBtn").style.display = "none";
      console.log(user.metadata.creationTime + " , " + user.metadata.lastSignInTime);
      var localuser =  ref(db, 'users/' + uid);
      get(localuser, `users/${uid}`).then((snapshot) => {
        if (snapshot.exists()) {
          console.log("Exists!");
          var userData = snapshot.val();
          currUser = new User(user.uid, userData["username"], userData["GPA"]);
          GoToDashboard();
      
        }
        else
        {
          CreateNewUser(user);
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
function ShowNumberOfUsers() {
  var counter = document.getElementById("currentuserscount");
  counter.textContent = 0;

  get(usersRef, "users").then((snapshot) => {
    if (snapshot.exists()) {

      var result = snapshot.val();
      var values = Object.values(result);
      counter.textContent = values.length;


      for (var key of Object.keys(result)) {
        // this will give you the key & values for all properties
        var temp = result[key];
        currUser = new User(user.uid, temp["username"], temp["GPA"]);
        //console.log(key + " -> " + user.username + " , " + user.gpa);
        // .. process the data here! 
    }

    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}
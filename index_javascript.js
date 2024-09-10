// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import  { getDatabase, ref, get, set, child, onValue, onChildAdded, onChildChanged, onChildRemoved}  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import  { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut}  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
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
const database = getDatabase(app);
const db = getDatabase();
function CreateNewUser(name) {
  set(ref(db, 'users/' + name), {
    username: name,
    GPA: 0.0,
  });
}
const usersRef = ref(db, 'users/');
onValue(usersRef, (snapshot) => {
  const data = snapshot.val();
  //console.log(data);
});
onChildAdded(usersRef, (snapshot) => {
  const data = snapshot.val();
  //console.log(data["GPA"]);
});

onChildChanged(usersRef, (snapshot) => {
  const data = snapshot.val();
  //console.log(data["GPA"]);
});

onChildRemoved(usersRef, (snapshot) => {
  const data = snapshot.val();
  //console.log(data["GPA"]);
});
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
  signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
  });
}


class User
{
  constructor(username, gpa) {
    this.username = username;
    this.gpa = gpa;
  }
}
document.addEventListener('DOMContentLoaded', function() {
  ShowNumberOfUsers();
  // var email = "";
  // var password = "";
  // createUserWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // Signed up 
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });

	//window.onmousemove  = function() {myFunction()};
	
	
})





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
        const user = new User(temp["username"], temp["GPA"]);
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
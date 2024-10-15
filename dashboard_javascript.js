// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import  { getDatabase, ref, get, set, child, onValue, onChildAdded, onChildChanged, onChildRemoved}  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import  { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut}  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as global from './global.js';
// Your web app's Firebase configuration

document.addEventListener('DOMContentLoaded', function() {
  //ShowNumberOfUsers();
  console.log(global.currUser);
  onAuthStateChanged(global.auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      
      let str = user.displayName;
      // Remove trailing underscores using regular expression
      let trimmedStr = str.replace(/_+$/, ' ');

      document.getElementById("nameheader").textContent = trimmedStr;
      FetchCourses();
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
	//window.onmousemove  = function() {myFunction()};
	
	
})

// added for dashboardbanner line 88 block
document.addEventListener('DOMContentLoaded', function() {
  onAuthStateChanged(global.auth, (user) => {
    if (user) {
      const uid = user.uid;
      
      let str = user.displayName;
      let trimmedStr = str ? str.replace(/_+$/, '') : 'User';

      document.getElementById("banner_name").textContent = `Welcome back, ${trimmedStr}!`;
      
      FetchCourses();
    }
  });
});



function FetchCourses()
{
  var courseTable = document.getElementById("courseTable");
  get(global.coursesRef, "courses").then((snapshot) => {
    if (snapshot.exists()) {
      var result = snapshot.val();
      var values = Object.values(result);


      for (var key of Object.keys(result)) {
          // this will give you the key & values for all properties
          var temp = result[key];
          var currCourse = new global.Course(temp["courseCode"], temp["courseName"]);
          
          //console.log(key + " -> " + user.username + " , " + user.gpa);
          // .. process the data here! 
      }
    }
    else
    {
      CreateNewCourse(new Course("IS111", "Intro to programming"));
    }
  });
  
}



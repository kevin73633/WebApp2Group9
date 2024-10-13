// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import  { getDatabase, ref, get, set, child, onValue, onChildAdded, onChildChanged, onChildRemoved}  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import  { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut}  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
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
function CreateNewCourse(course) {
  set(ref(db, 'courses/' + course.courseCode), {
    courseCode: course.courseCode,
    courseName: course.courseName,
  });
}
const coursesRef = ref(db, 'courses/');

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
    this.courseName = courseName;
  }
}

//AUTH
const auth = getAuth();
const form = document.getElementById('form');

function logout () {
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
  onAuthStateChanged(auth, (user) => {
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
  get(coursesRef, "courses").then((snapshot) => {
    if (snapshot.exists()) {
      var result = snapshot.val();
      var values = Object.values(result);


      for (var key of Object.keys(result)) {
          // this will give you the key & values for all properties
          var temp = result[key];
          var currCourse = new Course(temp["courseCode"], temp["courseName"]);
          
          var item = document.createElement("li");
          item.textContent = currCourse.courseCode;
          courseTable.appendChild(item);
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



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
const auth = getAuth();
// Initialize Realtime Database and get a reference to the service

//REALTIME DATABASE
const db = getDatabase();
var currUser = null;
function CreateNewUser(user) {
    var initialGPA = 0.0;
    set(ref(global.db, 'users/' + user.uid), {
      username: user.displayName,
      GPA: initialGPA,
      courses: user.courses,
    });
    currUser = new User(user.uid, user.displayName, initialGPA);
}
function logout () {
    console.log("Logging out");
    signOut(global.auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
    });
  }
function SetCurrentUser(user)
{
    currUser = user;
}
function CreateNewCourse(course) {
  set(ref(db, 'courses/' + course.courseCode), {
    courseCode: course.courseCode,
    courseName: course.courseName,
    courseCategory: course.courseCategory
  });
}
const coursesRef = ref(db, 'courses/');
class Course
{
  constructor(courseCode, courseName, courseCategory, courseDescription = "") {
    this.courseCode = courseCode;
    this.courseName = courseName;
    this.courseCategory = courseCategory;
    this.courseDescription = courseDescription;
    this.status = "no";
    this.enrolled_year = null;
  }
}
class User
{
  constructor(uid, username, gpa) {
    this.uid = uid;
    this.username = username;
    this.gpa = gpa;
    this.courses = [];
  }
  AddNewCourse(courseCode) 
  {
    this.courses.push(courseCode);
    set(ref(db, 'users/' + user.uid), {
      username: this.displayName,
      GPA: this.gpa,
      courses: this.courses,
    });
  }

}

export
{
    firebaseConfig,
    app,
    auth,
    db,
    User,
    Course,
    coursesRef,
    currUser,
    CreateNewUser,
    SetCurrentUser,
    logout

}
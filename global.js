// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import  { getDatabase, ref, get, push, set, update, child, onValue, onChildAdded, onChildChanged, onChildRemoved}  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
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
const coursesRef = ref(db, 'courses/');

var currUser = null;
var allCourses = [];
function CreateNewUser(user) {
    var initialGPA = 0.0;
    set(ref(db, 'users/' + user.uid), {
      username: user.displayName,
      GPA: initialGPA,
      courses: [],
    });
    currUser = new User(user.uid, user.displayName, initialGPA);
}
function logout () {
    console.log("Logging out");
    signOut(auth).then(() => {
        // Sign-out successful.
        //clear curruser and allcourses
        currUser = null;
        allCourses = null;
        sessionStorage.setItem("allCourses",  null);
        sessionStorage.setItem("currUser",  null);
        window.location.href = "index.html"; 
        //
      }).catch((error) => {
        // An error happened.
    });
  }
function SetCurrentUser(user)
{
    currUser = new User(user.uid, user.username, user.gpa, user.courses);
}
function SetAllCourses(courses)
{
    allCourses = [];
    for (var course of courses)
    {
      allCourses.push(new Course(course.courseCode, course.courseName, course.courseCategory, course.recommendedYearAndSem, course.courseDescription));
    }
    for (var course in currUser.courses)
    {
      var courseCode = course;
      var yearAndSemTaken = currUser.courses[course];
      var fullCourse = Course.GetByCourseCode(courseCode);
      if (fullCourse != null)
      {
        fullCourse.status = "yes";
        fullCourse.enrolled_year = yearAndSemTaken;
      }
    }
}
function CreateNewCourse(course) {
  console.log(course);
  set(ref(db, 'courses/' + course.courseCode), {
    courseCode: course.courseCode,
    courseName: course.courseName,
    courseCategory: course.courseCategory,
    courseDescription: course.courseDescription,
    recommendedYearAndSem: course.recommendedYearAndSem,
  });
}

class Course
{
  constructor(courseCode, courseName, courseCategory, recommendedYearAndSem = "Y1S1", courseDescription = "") {
    this.courseCode = courseCode;
    this.courseName = courseName;
    this.courseCategory = courseCategory;
    this.courseDescription = courseDescription;
    this.recommendedYearAndSem = recommendedYearAndSem;
    this.status = "no";
    this.enrolled_year = null;
  }
  static GetByCourseCode(courseCode)
  {
    for (let index = 0; index < allCourses.length; index++) {
      const element = allCourses[index];
      if (element.courseCode == courseCode)
      {
        return element;
      }
    }
  }
}
class User
{
  constructor(uid, username, gpa, courses, degree = null, currentYearAndSem = "Y1S1") {
    this.uid = uid;
    this.username = username;
    this.gpa = gpa;
    this.courses = courses;
    this.degree = degree;
    this.currentYearAndSem = currentYearAndSem;
  }
  SetInitialValues(username = this.username, gpa = this.gpa, degree = this.degree, currentYearAndSem = this.currentYearAndSem)
  {
    this.username = username;
    this.gpa = gpa;
    this.degree = degree;
    this.currentYearAndSem = currentYearAndSem;
    set(ref(db, 'users/' + this.uid), {
      username: this.username,
      GPA: this.gpa,
      degree: this.degree,
      currentYearAndSem: this.currentYearAndSem
    });
  }
  AddNewCourse(courseCode, yearAndSemTaken)
  {

    // Get a key for a new Post.
    var localuser =  ref(db,`users/${this.uid}`);
    const newPostKey = push(child(localuser, 'posts')).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates[`users/${this.uid}/courses/${courseCode}`] = yearAndSemTaken;
    var exists = false;
    for (var course in currUser.courses)
    {
      if (courseCode == course)
      {
        currUser.courses[course] = yearAndSemTaken;
        exists = true;
      }
    }
    if (exists == false)
    {
      var newCourse = {};
      newCourse[courseCode] = yearAndSemTaken;
      currUser.courses[courseCode] = yearAndSemTaken;
    }
    Course.GetByCourseCode(courseCode).enrolled_year = yearAndSemTaken;
    Course.GetByCourseCode(courseCode).status = "yes";
    return update(ref(db), updates);
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
    CreateNewCourse,
    currUser,
    allCourses,
    SetAllCourses,
    CreateNewUser,
    SetCurrentUser,
    logout,

}
// Import the functions you need from the SDKs you need
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { get, ref } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
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
      get(global.coursesRef, "courses").then((snapshot) => {
        if (snapshot.exists()) {
            var result = snapshot.val();
    
            for (var key of Object.keys(result)) {
                // this will give you the key & values for all properties
                var temp = result[key];
                var currCourse = new global.Course(temp["courseCode"], temp["courseName"], temp["courseCategory"], temp["recommendedYearAndSem"], temp["courseDescription"]);
                //console.log(currCourse);
                global.allCourses.push(currCourse);
                //console.log(key + " -> " + user.username + " , " + user.gpa);
                // .. process the data here! 
            }
            var localuser =  ref(global.db, 'users/' + uid);
            get(localuser, `users/${uid}`).then((snapshot) => {
              if (snapshot.exists()) {
                console.log("User Exists!");
                var userData = snapshot.val();
                var userCourses = userData["courses"];
                if (userCourses == null)
                  userCourses = [];
                global.SetCurrentUser(new global.User(user.uid, userData["username"], userData["GPA"], userCourses, userData["degree"], userData["currentYearAndSem"]));
                sessionStorage.setItem("currUser",  JSON.stringify(global.currUser));
                global.SetAllCourses(global.allCourses);
                sessionStorage.setItem("allCourses",  JSON.stringify(global.allCourses));
                GoToDashboard();
            
              }
              else
              {
                global.CreateNewUser(user);
                sessionStorage.setItem("allCourses",  JSON.stringify(global.allCourses));
                //showpopup
                $('#userDetailsModal').show();
                //GoToDashboard();
            
              }
            });
        }
        else
        {
           
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


		// Function to handle form submission and validation
function saveDetails() {
    // Get the values from the form fields
    const degree = degreeInput.value.trim();  // Trim spaces
    const gpa = gpaInput.value.trim();  // Get GPA as string
    const year = yearInput.value;
    const semester = semesterInput.value;

    // Errors
    const gpaError = document.getElementById('gpaError');
    gpaError.textContent = '';

    const saveDetailsError = document.getElementById('saveDetailsError');
    saveDetailsError.textContent = '';

    // Check if any field is empty
    if (!degree || !gpa || !year || !semester) {
      // alert('Please fill out all fields.');
      saveDetailsError.textContent = 'Please fill out all fields.';
      saveDetailsError.style.display = 'block';
      return;
    }

    // Convert GPA to number and validate range
    const gpaValue = parseFloat(gpa);
    if (gpaValue < 0.01 || gpaValue > 4.3) {
    // alert('Please enter a GPA between 0.01 and 4.3.');
      gpaError.textContent = 'GPA must be between 0.01 and 4.3.';
      gpaError.style.display = 'block';
      return;
    }

    // Log the collected details (replace this with your save action)
    console.log({
        degree: degree,
        gpa: gpaValue,
        year: year,
        semester: semester
    });
    global.currUser.SetInitialValues(global.currUser.username, gpaValue, degree, year + semester)
    sessionStorage.setItem("currUser",  JSON.stringify(global.currUser));
    //alert("Details saved successfully!");

    // Close the modal after saving
    $('#userDetailsModal').hide();
    GoToDashboard();
}
document.getElementById("saveDetailsBtn").onclick = function(){saveDetails();};
    

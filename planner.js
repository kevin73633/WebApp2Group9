// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { get, getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as global from './global.js';

// All the options in the filter
const Categories = ["All Tracks"];
// All the courses taken from database
var Courses = [];
var SelectedCoursesList = [];

function ShowPlanner()
{
    var table = document.getElementById("plannerTable").getElementsByTagName("thead")[0];
    var headers = table.getElementsByTagName("tr")[0];
    for (var course in global.currUser.courses)
    {
        var row = document.createElement("tr");
        var td = document.createElement("td");
        td.textContent = global.Course.GetByCourseCode(course).courseName;
        td.setAttribute("class", "sticky-col")
        row.appendChild(td);
        
        for (let index = 1; index < 17; index++) 
        {
            td = document.createElement("td");
            var currHeader = headers.getElementsByTagName("th");
            if (currHeader[index].getAttribute("value") == global.currUser.courses[course])
            {
                td.style.backgroundColor = "red";
            }
            row.appendChild(td);
        }
        table.appendChild(row);
        //td.style.backgroundColor = "red";
    }
}
document.addEventListener('DOMContentLoaded', function() {
    global.SetCurrentUser(JSON.parse(sessionStorage.getItem("currUser")));
    global.SetAllCourses(JSON.parse(sessionStorage.getItem("allCourses")));
    document.getElementById("logoutBtn").onclick = function() {global.logout();};
    document.getElementById("nameheader").textContent = global.currUser.username.replace(/_+$/, ' ');
    document.getElementById("profileData").textContent = `Current Sem: ${global.currUser.currentYearAndSem} | GPA: ${(Math.round(global.currUser.gpa * 100) / 100).toFixed(2)}`;
    global.currUser.SortCourses();
    ShowPlanner();
    
})



// Function to handle form submission and validation
function saveDetails() {
    // Get the values from the form fields
    const degree = degreeInput.value.trim();  // Trim spaces
    const gpa = gpaInput.value.trim();  // Get GPA as string
    const year = yearInput.value;
    const semester = semesterInput.value;

    // Check if any field is empty
    if (!degree || !gpa || !year || !semester) {
        alert('Please fill out all fields.');
        return;
    }

    // Convert GPA to number and validate range
    const gpaValue = parseFloat(gpa);
    if (gpaValue < 0.01 || gpaValue > 4.3) {
        alert('Please enter a GPA between 0.01 and 4.3.');
        return;
    }

    // Log the collected details (replace this with your save action)
    console.log({
        degree: degree,
        gpa: gpaValue,
        year: year,
        semester: semester
    });
    global.currUser.SetProfileValues(gpaValue, degree, year + semester);
    document.getElementById("profileData").textContent = `Current Sem: ${global.currUser.currentYearAndSem} | GPA: ${(Math.round(global.currUser.gpa * 100) / 100).toFixed(2)}`;
    //alert("Details saved successfully!");

    // Close the modal after saving
    location.reload();
}

// Trigger save on button click
saveDetailsBtn.addEventListener('click', saveDetails);

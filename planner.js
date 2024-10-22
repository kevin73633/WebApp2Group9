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

// Acts like "import"
function ShowPlanner()
{
    var table = document.getElementById("plannerTable").getElementsByTagName("thead")[0];
    var headers = table.getElementsByTagName("tr")[0];
    for (var course in global.currUser.courses)
    {
        var row = document.createElement("tr");
        var td = document.createElement("td");
        td.textContent = global.Course.GetByCourseCode(course).courseName;
        row.appendChild(td);
        
        for (let index = 1; index < 17; index++) 
        {
            td = document.createElement("td");
            var currHeader = headers.getElementsByTagName("th");
            console.log(currHeader[index].getAttribute("value") + " " + global.currUser.courses[course]);
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
    global.currUser.SortCourses();
    ShowPlanner();
    
})
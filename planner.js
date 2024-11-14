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

function ShowPlanner1() {
    document.getElementById("plannerTable").style.display = "none";
    var coursePlanner = document.getElementById("coursePlanner");
    coursePlanner.innerHTML = "";

    var semCodes = ["1", "2", "3a", "3b"];
    for (let index = 0; index < 4; index++) {
        var content = `
            <div class="col-12 col-md-6 col-lg-3"> 
                <div class="card mx-1 my-2 plannerCard">
                    <h3 class="py-2 year">&nbsp Year ${index + 1}</h3>`;
        var yearHasCourses = false;
        for (let index2 = 0; index2 < 4; index2++) {
            var CoursesInYearAndSem = global.Course.GetAllCoursesInYearAndSem("Y" + (index + 1) + "S" + semCodes[index2]);
            console.log(CoursesInYearAndSem)
            if (CoursesInYearAndSem.length > 0) {
                yearHasCourses = true;
                content += `
                    <div class="card-body mb-2">
                        <h5 class="card-title semester">Semester ${semCodes[index2]}</h5>`;
                
                for (let index3 = 0; index3 < CoursesInYearAndSem.length; index3++) {
                    const element = CoursesInYearAndSem[index3];
                    content += `<div class="card innerPlanner">${global.Course.GetByCourseCode(element.courseCode).courseName}</div>`;
                }
                content += `</div>`;
            }
        }
        if (!yearHasCourses) {
            content += `<p class="px-3 subtitle">No planned courses yet</p>`;
        }
        content += `</div></div>`;
        coursePlanner.innerHTML += content;
    }
}

function ShowPlanner2()
{
    document.getElementById("plannerTable").style.display = "block";
    document.getElementById("coursePlanner").innerHTML = "";
    var table = document.getElementById("plannerTable").getElementsByTagName("thead")[0];
    table.innerHTML =   `
        <tr>
                            <th scope="col" class="text-body-tertiary"  style="width: 25%;">Module Name</th>
                            <th scope="col" value = "Y1S1" class="text-body-tertiary" style="width: 5%; text-align:center;">Y1S1</th>
                            <th scope="col" value = "Y1S2" class="text-body-tertiary" style="width: 5%; text-align:center;">Y1S2</th>
                            <th scope="col" value = "Y1S3a" class="text-body-tertiary" style="width: 5%; text-align:center;">Y1S3A</th>
                            <th scope="col" value = "Y1S3b" class="text-body-tertiary" style="width: 5%; text-align:center;">Y1S3B</th>
                            <th scope="col" value = "Y2S1" class="text-body-tertiary" style="width: 5%; text-align:center;">Y2S1</th>
                            <th scope="col" value = "Y2S2" class="text-body-tertiary" style="width: 5%; text-align:center;">Y2S2</th>
                            <th scope="col" value = "Y2S3a" class="text-body-tertiary" style="width: 5%; text-align:center;">Y2S3A</th>
                            <th scope="col" value = "Y2S3b" class="text-body-tertiary" style="width: 5%; text-align:center;">Y2S3B</th>
                            <th scope="col" value = "Y3S1" class="text-body-tertiary" style="width: 5%; text-align:center;">Y3S1</th>
                            <th scope="col" value = "Y3S2" class="text-body-tertiary" style="width: 5%; text-align:center;">Y3S2</th>
                            <th scope="col" value = "Y3S3a" class="text-body-tertiary" style="width: 5%; text-align:center;">Y3S3A</th>
                            <th scope="col" value = "Y3S3b" class="text-body-tertiary" style="width: 5%; text-align:center;">Y3S3B</th>
                            <th scope="col" value = "Y4S1" class="text-body-tertiary" style="width: 5%; text-align:center;">Y4S1</th>
                            <th scope="col" value = "Y4S2" class="text-body-tertiary" style="width: 5%; text-align:center;">Y4S2</th>
                            <th scope="col" value = "Y4S3a" class="text-body-tertiary" style="width: 5%; text-align:center;">Y4S3A</th>
                            <th scope="col" value = "Y4S3b" class="text-body-tertiary" style="width: 5%; text-align:center;">Y4S3B</th>

                        </tr>`
    var headers = table.getElementsByTagName("tr")[0];
    for (var course in global.currUser.GetAllCourseYearAndSemTaken())
    {
        var row = document.createElement("tr");
        var td = document.createElement("td");
        td.textContent = global.Course.GetByCourseCode(course).courseName;
        row.appendChild(td);
        
        for (let index = 1; index < 17; index++) 
        {
            td = document.createElement("td");
            var currHeader = headers.getElementsByTagName("th");
            td.innerHTML = `<div class = "emptybox"></div>`;
            if (currHeader[index].getAttribute("value") == global.currUser.GetAllCourseYearAndSemTaken()[course])
            {
                td.innerHTML = `<div class = "plannerbox"></div>`;
            }
            row.appendChild(td);
        }
        table.appendChild(row);
        //td.style.backgroundColor = "red";
    }
}
function togglePlannerMode()
{
    var val = document.getElementById("viewToggle").checked;
    if (val)
    {
        ShowPlanner2();
    }
    else
    {
        ShowPlanner1();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem("currUser") == "null" || sessionStorage.getItem("currUser") == null )
    {
        window.location.href = "index.html";
        return;
    }
    global.SetCurrentUser(JSON.parse(sessionStorage.getItem("currUser")));
    global.SetAllCourses(JSON.parse(sessionStorage.getItem("allCourses")));
    document.getElementById("logoutBtn").onclick = function() {global.logout();};
    document.getElementById("nameheader").textContent = global.currUser.username.replace(/_+$/, ' ');
    document.getElementById("profileData").textContent = `Current Sem: ${global.currUser.currentYearAndSem} | GPA: ${(Math.round(global.currUser.gpa * 100) / 100).toFixed(2)}`;
    global.currUser.SortCourses();
    document.getElementById("viewToggle").onclick = function(){togglePlannerMode();};
    ShowPlanner1();
    //ShowPlanner2();
})

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
    global.currUser.SetProfileValues(gpaValue, degree, year + semester);
    sessionStorage.setItem("currUser",  JSON.stringify(global.currUser));
    document.getElementById("profileData").textContent = `Current Sem: ${global.currUser.currentYearAndSem} | GPA: ${(Math.round(global.currUser.gpa * 100) / 100).toFixed(2)}`;
    //alert("Details saved successfully!");

    // Close the modal after saving
    location.reload();
}

// Trigger save on button click
saveDetailsBtn.addEventListener('click', saveDetails);
gpaInput.addEventListener("keypress", function(event) 
{
    if (event.key === "Enter") 
    {
        event.preventDefault();
        saveDetails();
    }
});

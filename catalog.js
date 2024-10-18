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
const Courses = [];

function FetchCourses(selectedFilterOption="All Tracks")
{
  get(global.coursesRef, "courses").then((snapshot) => {
    if (snapshot.exists()) {
        var result = snapshot.val();

        for (var key of Object.keys(result)) {
            // this will give you the key & values for all properties
            var temp = result[key];
            var currCourse = new global.Course(temp["courseCode"], temp["courseName"], temp["courseCategory"], temp["courseDescription"]);
            //console.log(currCourse);
            Courses.push(currCourse);
            //console.log(key + " -> " + user.username + " , " + user.gpa);
            // .. process the data here! 
        }
        // console.log(courses);
        createRows(selectedFilterOption);
        createFilterOptions(selectedFilterOption);
    }
    else
    {
    //   CreateNewCourse(new Course("IS111", "Intro to programming", "IS Core", "In this course students acquire foundational computer programming concepts and skills through Python, a widely-used programming language. Upon successful completion of this course, the students will understand and be able to appropriately apply fundamental programming concepts including variables, functions, parameters, loops and conditions as well as basic data structures including arrays (lists in Python) and hash tables (dictionaries in Python) in simple applications."));
    //   CreateNewCourse(new Course("CS102", "Programming Fundamentals II", "CS Core", "This course focuses on fundamental concepts of developing programs using an object oriented approach. There will be an emphasis on writing clean and efficient code, and the ability to use an appropriate data structure or algorithm to solve problems. The Java programming language will be taught in depth."));
    //   CreateNewCourse(new Course("IS112", "Data Mangement", "IS Core", "This course will cover the fundamentals of relational database theory, important data management concepts such as data modelling, database design, database implementation and search in unstructured data (i.e., text) in current business information systems. <br><br> A series of in-class exercises, tests, quizzes and course project will help students understand covered topics. Students are expected to apply knowledge learned in the classroom to solve many problems based on real-life business scenarios, while gaining hands-on experience in designing, implementing, and managing database systems."));
    }
  });
  
}

function createModulesTable() 
{
    /*
        This function creates the table of modules when user pressed "Search" button, 
        also calls createFilterOptions() to create the filter
    */

    // Resets table
    removeTableItems();

    // Reset Courses and Categories
    resetTableConstVar();

    // Get Courses from db and create table
    FetchCourses();
}

function removeTableItems() {
    /* This functions removes the items in the table if the search button has been pressed before*/

    // Get table rows
    var tableModules = document.getElementById("tableModules");
    tableModules.children[1].remove();
}

function resetTableConstVar() {
    for (let i=0; i < Courses.length+2; i++) {
        Courses.pop();
    }

    for (let i=0; i < Categories.length-1; i++) {
        Categories.pop();
    }
}

function createFilterOptions(selectedFilterOption) {
    /* This function creates the filter options*/

    // <option selected>All Tracks</option>
    //   <option value="1">...</option>
    //   <option value="2">..</option>
    var select = document.getElementById("filterOptions");
    select.innerHTML = "";

    for (var data_item of Courses) {
        var courseCategory = data_item.courseCategory;
        if (Categories.indexOf(courseCategory) == -1) {
            Categories.push(courseCategory);
        }
    }

    for (let courseCategory of Categories) {
        var options = document.createElement("option");
        options.setAttribute("value", courseCategory);
        options.innerText = courseCategory;
        if (selectedFilterOption == courseCategory) {
            options.selected = true;
        }
        select.appendChild(options);
    }
}

function editModulesTable() {
    /* This function changes the table when there is a change in filter */

    // Get the selected option and table
    var selectedFilterOption = document.getElementById("filterOptions").value;

    // Resets table
    removeTableItems();

    // Create filtered table
    createRows(selectedFilterOption);
}

function createRows(selectedOption) {
    /* Module that creates the rows and append to table */

    // Table example
    //   <td><input type="checkbox"></td>
    //   <td>Introduction to Programming</td>
    //   <td>111</td>
    //   <td>IS Core</td>
    //   <td>Enrolled Y1</td>
    //   <td><button type="button" class="btn btn-secondary px-3 rounded-2">View More</button></td>

    // Get tableModule
    var tableModules = document.getElementById("tableModules");

    // Create Element: Table Body
    var tableBody = document.createElement("tbody");

    for (var data_item of Courses) {
        if (data_item.courseCategory === selectedOption || selectedOption === "All Tracks") {
            //Create Table Row
            var row = document.createElement("tr");

            var courseName = data_item.courseName;
            var courseCode = data_item.courseCode;
            var courseCategory = data_item.courseCategory;
            var tookCourse = data_item.status;
            var enrolledYear = data_item.enrolled_year;
            
            // Create checkbox
            var col = document.createElement("td");
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.value = courseCode;
            col.appendChild(checkbox);
            row.appendChild(col);

            // Create the other columns
            var col = document.createElement("td");
            col.innerText = courseName;
            row.appendChild(col);

            var col = document.createElement("td");
            col.innerText = courseCode;
            row.appendChild(col);

            var col = document.createElement("td");
            col.innerText = courseCategory;
            row.appendChild(col);

            var col = document.createElement("td");
            // For enrolled or not, use if-else
            if (tookCourse === "yes") {
                col.innerText = "Enrolled " + enrolledYear;
                col.setAttribute("class", "text-success");
            }
            else {
                col.innerText = "Not Enrolled";
                col.setAttribute("class", "text-danger");
            }
            row.appendChild(col);

            // Create button
            var col = document.createElement("td");
            var button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("class", "btn btn-secondary px-3 rounded-2");
            button.setAttribute("data-bs-toggle", "modal");
            button.setAttribute("data-bs-target",`#Modal_${courseCode}`);
            button.innerText = "View More";
            col.appendChild(button);
            row.appendChild(col);

            // Create Modal
            var modalDiv = createModal(data_item);
            document.getElementById("modals").innerHTML += modalDiv;

            // Append row to tbody
            tableBody.appendChild(row);
        }

        //Append row to table
        tableModules.appendChild(tableBody);
    }
}

function createModal(course) {
    /* This function creates the modal and returns the div of the modal */

    // <!-- Modal -->
    var modal = null;
    modal = `<div class="modal fade" id="Modal_${course.courseCode}" tabindex="-1" aria-labelledby="Modal_${course.courseCode}" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="Modal_${course.courseCode}">${course.courseName}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${course.courseDescription}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`
    return modal
}

// Acts like "import"
document.addEventListener('DOMContentLoaded', function() {
    global.SetCurrentUser(JSON.parse(sessionStorage.getItem("currUser")));
    // console.log(global.currUser);

    createFilterOptions()

    // For the search button
    var searchBtn = document.getElementById("searchBtn");
    searchBtn.onclick = function() {createModulesTable();}
    
    // For the filtering onchange
    document.getElementById("filterOptions").onchange = function() {editModulesTable()}
})
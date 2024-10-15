// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import  { getDatabase, ref, get, set}  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
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
    courseCategory: course.courseCategory,
    courseDescription: course.courseDescription,
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
// Example Data
// const exampleData = [
//     {"courseName": "Introduction to Programming", "courseCode": "IS111", "courseCategory": "IS Core", "status": "yes", "enrolled_year": "Y1"},
//     {"courseName": "Programming Fundamentals II", "courseCode": "CS102", "courseCategory": "CS Core", "status": "yes", "enrolled_year": "Y2"},
//     {"courseName": "Data Mangement", "courseCode": "IS112", "courseCategory": "IS Core", "status": "no", "enrolled_year": null}
// ]

// const courseDescription = [
//     {"courseCode": "IS111", "desc": "In this course students acquire foundational computer programming concepts and skills through Python, a widely-used programming language. Upon successful completion of this course, the students will understand and be able to appropriately apply fundamental programming concepts including variables, functions, parameters, loops and conditions as well as basic data structures including arrays (lists in Python) and hash tables (dictionaries in Python) in simple applications."},
//     {"courseCode": "CS102", "desc": "This course focuses on fundamental concepts of developing programs using an object oriented approach. There will be an emphasis on writing clean and efficient code, and the ability to use an appropriate data structure or algorithm to solve problems. The Java programming language will be taught in depth."},
//     {"courseCode": "IS112", "desc": "This course will cover the fundamentals of relational database theory, important data management concepts such as data modelling, database design, database implementation and search in unstructured data (i.e., text) in current business information systems. <br><br> A series of in-class exercises, tests, quizzes and course project will help students understand covered topics. Students are expected to apply knowledge learned in the classroom to solve many problems based on real-life business scenarios, while gaining hands-on experience in designing, implementing, and managing database systems."}
// ]

// All the options in the filter
const Categories = ["All Tracks"];

/* This document contains functions: createFilterOptions(), createModulesTable(), removeTableItems(tableModules), editModulesTable(), createRows(tableModules, [selectedOption]) */

function createFilterOptions(selectedFilterOption, courses="") {
    /* This function creates the filter options*/

    // <option selected>All Tracks</option>
    //   <option value="1">...</option>
    //   <option value="2">..</option>
    var select = document.getElementById("filterOptions");
    select.innerHTML = "";

    for (var data_item of courses) {
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

function createModulesTable() 
{
    /*
        This function creates the table of modules when user pressed "Search" button, 
        also calls createFilterOptions() to create the filter
    */

    // Table example
    //   <td><input type="checkbox"></td>
    //   <td>Introduction to Programming</td>
    //   <td>111</td>
    //   <td>IS Core</td>
    //   <td>Enrolled Y1</td>
    //   <td><button type="button" class="btn btn-secondary px-3 rounded-2">View More</button></td>

    // Get Table Element
    var tableModules = document.getElementById("tableModules");

    // Resets table
    removeTableItems(tableModules)

    // Create table
    
    // createRows(tableModules);

    // // Update filter options
    // for (data_item of exampleData) {
    //     if (Categories.indexOf(data_item["courseCategory"]) === -1) {
    //         Categories.push(data_item["courseCategory"])
    //     }
    // }
    FetchCourses();
}
function FetchCourses(selectedFilterOption="All Tracks")
{
  get(coursesRef, "courses").then((snapshot) => {
    if (snapshot.exists()) {
        var result = snapshot.val();
        var courses = [];

        for (var key of Object.keys(result)) {
            // this will give you the key & values for all properties
            var temp = result[key];
            var currCourse = new Course(temp["courseCode"], temp["courseName"], temp["courseCategory"], temp["courseDescription"]);
            //console.log(currCourse);
            courses.push(currCourse);
            //console.log(key + " -> " + user.username + " , " + user.gpa);
            // .. process the data here! 
        }
        // console.log(courses);
        createRows(document.getElementById("tableModules"), courses, selectedFilterOption);
        createFilterOptions(selectedFilterOption, courses);
    }
    else
    {
    //   CreateNewCourse(new Course("IS111", "Intro to programming", "IS Core", "In this course students acquire foundational computer programming concepts and skills through Python, a widely-used programming language. Upon successful completion of this course, the students will understand and be able to appropriately apply fundamental programming concepts including variables, functions, parameters, loops and conditions as well as basic data structures including arrays (lists in Python) and hash tables (dictionaries in Python) in simple applications."));
    //   CreateNewCourse(new Course("CS102", "Programming Fundamentals II", "CS Core", "This course focuses on fundamental concepts of developing programs using an object oriented approach. There will be an emphasis on writing clean and efficient code, and the ability to use an appropriate data structure or algorithm to solve problems. The Java programming language will be taught in depth."));
    //   CreateNewCourse(new Course("IS112", "Data Mangement", "IS Core", "This course will cover the fundamentals of relational database theory, important data management concepts such as data modelling, database design, database implementation and search in unstructured data (i.e., text) in current business information systems. <br><br> A series of in-class exercises, tests, quizzes and course project will help students understand covered topics. Students are expected to apply knowledge learned in the classroom to solve many problems based on real-life business scenarios, while gaining hands-on experience in designing, implementing, and managing database systems."));
    }
  });
  
}
function removeTableItems(tableModules) {
    /* This functions removes the items in the table if the search button has been pressed before*/

    // Get table rows
    var rows = document.getElementById("listModules");

    if (rows !== null) {
        tableModules.children[1].remove();
    }
}

function editModulesTable() {
    /* This function changes the table when there is a change in filter */

    // Get the selected option
    var selectedFilterOption = document.getElementById("filterOptions").value;

    // Get Table Element
    var tableModules = document.getElementById("tableModules");

    // Resets table
    removeTableItems(tableModules);

    FetchCourses(selectedFilterOption);
    
}

function createRows(tableModules, courses, selectedOption) {
    /* Module that creates the rows and append to table */

    // Create Element: Table Body
    var tableBody = document.createElement("tbody");
    tableBody.setAttribute("id", "listModules");

    for (var data_item of courses) {
        if (data_item.courseCategory === selectedOption || selectedOption === "All Tracks") {
            //Create Table Row
            var row = document.createElement("tr");

            var courseName = data_item.courseName;
            var courseCode = data_item.courseCode;
            var courseCategory = data_item.courseCategory;
            var tookCourse = data_item.status;
            var enrolledYear = data_item.enrolled_year;
            
            // Create checkbox
            var tableDataCol = document.createElement("td");
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.value = courseCode;
            tableDataCol.appendChild(checkbox);
            row.appendChild(tableDataCol);

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
            var tableDataCol = document.createElement("td");
            var button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("class", "btn btn-secondary px-3 rounded-2");
            button.setAttribute("data-bs-toggle", "modal");
            button.setAttribute("data-bs-target",`#Modal_${courseCode}`);
            button.innerText = "View More";
            tableDataCol.appendChild(button);

            // Create Modal
            var modalDiv = createModal(data_item);
            document.getElementById("modals").innerHTML += modalDiv;

            // Append column to row
            row.appendChild(tableDataCol);

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
    createFilterOptions()

    // For the search button
    var searchBtn = document.getElementById("searchBtn");
    searchBtn.onclick = function() {createModulesTable();}
    
    // For the filtering onchange
    document.getElementById("filterOptions").onchange = function() {editModulesTable()}
})
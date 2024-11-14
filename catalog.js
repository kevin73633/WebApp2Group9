// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { get, getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as global from './global.js';

// All 'global variables'
var Categories = ["All Tracks", "CS", "SE", "IS", "C&L"];
var Courses = [];
var SearchCourses = [];
var SelectedCoursesList = [];

function FetchCourses()
{
    // Fetch from Database
    Courses = global.allCourses;
}

function createModulesTable(selectedFilterOption='All Tracks', search=false) 
{
    /*
        This function creates the table of modules and adds correct filter options 
        when user first entered the webpage
    */

    // Resets table
    removeTableItems();

    // Get Courses const variable
    createRows(selectedFilterOption,search);

    // Create filter
    createFilterOptions(search);
}

function removeTableItems() 
{
    /* This functions removes the items in the table if the search button has been pressed before*/
    
    // Get table rows
    var tableModules = document.getElementById("tableModules");
    tableModules.children[1].remove();
}

function createFilterOptions(search=false) 
{
    /* This function creates the filter options*/

    // <option selected>All Tracks</option>
    //   <option value="1">...</option>
    //   <option value="2">..</option>
    var select = document.getElementById("filterOptions");
    select.innerHTML = "";
    Categories = Categories.slice(0, 1);
    //console.log(Categories);

    // Based on if is searched or not
    if (search===true) {
        var loopCourses = SearchCourses;
    }
    else {
        var loopCourses = Courses;
    }

    // To split up all categories (esp those with ',')
    for (var data_item of loopCourses) {
        var courseCategory = data_item.courseCategory.split(',');
        for (var title of courseCategory) {
            if (Categories.indexOf(title) == -1) {
                Categories.push(title);
            }
        }
    }

    for (let courseCategory of Categories) {
        var options = document.createElement("option");
        options.setAttribute("value", courseCategory);
        options.innerText = courseCategory;
        select.appendChild(options);
    }
}

function editModulesTable() 
{
    /* This function changes the table when there is a change in filter */

    // Get the selected option and table
    var selectedFilterOption = document.getElementById("filterOptions").value;
    var searchInput = document.getElementById("searchInput").value;
    searchInput = searchInput.trim();

    // Resets table
    removeTableItems();

    // Create filtered table;
    if (searchInput === "") {
        createRows(selectedFilterOption)
    }
    else {
        createRows(selectedFilterOption,true)
    }
}

function createRows(selectedOption, search=false) 
{
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


    // Based on if is searched or not
    if (search===true) {
        var loopCourses = SearchCourses;
    }
    else {
        var loopCourses = Courses;
    }

    if (loopCourses.length == 0) {
        var row = document.createElement("tr");
        var col = document.createElement("td");
        col.innerText = 'Please enter code/name into search bar';
        col.setAttribute('colspan', '6');
        col.setAttribute('class', 'text-center text-secondary')
        row.appendChild(col)
        tableBody.appendChild(row)

    }
    else {

        for (var data_item of loopCourses) {
            //Create Table Row
            var row = document.createElement("tr");
            row.setAttribute("style","padding-y: 60px;")
            var courseName = data_item.courseName;
            var courseCode = data_item.courseCode;
            var courseCategory = data_item.courseCategory;
            var tookCourse = data_item.status;
            var enrolledYear = data_item.enrolled_year;
            var recommendedYearAndSem = data_item.GetDegreeSpecificRecommendedDate();

            if (selectedOption=="All Tracks" || courseCategory.indexOf(selectedOption) != -1) {
                // Create checkbox
                var col = document.createElement("td");
                col.setAttribute("class", "text-center");
                col.setAttribute("style", "width: 5%")
                var checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.value = courseCode + ":" + courseName;
                checkbox.onclick = function(){SetRemovalButtonState();};
                col.appendChild(checkbox);
                row.appendChild(col);

                // Create the other columns
                var col = document.createElement("td");
                // col.setAttribute("class", "text-center");
                col.setAttribute("style", " text-align:left;")
                col.innerHTML = `<a href = "#Modal_${courseCode}" data-bs-toggle = modal data-bs-target = "#Modal_${courseCode}">${courseName}</a>`;
                row.appendChild(col);

                var col = document.createElement("td");
                col.setAttribute("class", "text-center");
                col.innerText = courseCode;
                row.appendChild(col);

                var col = document.createElement("td");
                col.setAttribute("class", "text-center");
                col.innerText = courseCategory;
                row.appendChild(col);

                var col = document.createElement("td");
                col.setAttribute("class", "text-center");
                col.innerText = recommendedYearAndSem;
                row.appendChild(col);

                var col = document.createElement("td");
                col.setAttribute("class", "text-center");
                var span = document.createElement('span');
                // For enrolled or not, use if-else
                if (tookCourse === "yes") {
                    span.innerText = "Enrolled " + enrolledYear;
                    span.setAttribute('class', 'badge rounded-pill custom-success-badge')
                }
                else {
                    span.innerText = "Not Enrolled";
                    span.setAttribute('class', 'badge rounded-pill custom-danger-badge')
                }
                col.appendChild(span);
                row.appendChild(col);

                // var col = document.createElement("td");
                // col.setAttribute("class", "text-center")
                // var link = document.createElement("a");
                // link.setAttribute("href", `#Modal_${courseCode}`);
                // link.setAttribute("class", "px-2 text-decoration-none");
                // link.setAttribute("data-bs-toggle", "modal");
                // link.setAttribute("data-bs-target", `#Modal_${courseCode}`);
                // link.setAttribute("style", "font-size:12px");
                // link.innerText = "View More";
                // col.appendChild(link);
                row.appendChild(col);

                // Create Modal
                var modalDiv = createCourseModal(data_item);
                document.getElementById("modals").innerHTML += modalDiv;

                // Append row to tbody
                tableBody.appendChild(row);
            }
        }
    }
    //Append row to table
    tableModules.appendChild(tableBody);
}

function createCourseModal(course) 
{
    /* This function creates the modal and returns the div of the modal */

    // <!-- Modal -->
    var modal = null;
    modal = `<div class="modal modal-lg fade" id="Modal_${course.courseCode}" tabindex="-1" aria-labelledby="Modal_${course.courseCode}" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header modal-header-border">
                    <h1 class="modal-title fs-5" id="Modal_${course.courseCode}">${course.courseName}</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${course.courseDescription}
                </div>
                <div class="modal-footer modal-footer-border">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`
    return modal
}
function getAllSelectedCourses() 
{
    /* This function is to handle "Add to Planner" button */
    var selectedCourses = document.getElementsByTagName("input");
    // If pressed search before "Add to Planner"
    let courseIds = [];
    if (selectedCourses.length > 1) {
        SelectedCoursesList = [];
        for (let i=1; i < selectedCourses.length; i++) {
            let selection = selectedCourses[i];
            if (selection.checked) {
               courseIds.push(selection.value)
               SelectedCoursesList.push(global.Course.GetByCourseCode(selection.value.split(":")[0]));
            }
        }
    }
    return courseIds;
}
function SetRemovalButtonState()
{
    document.getElementById("removeFromPlanner").disabled = true;
    var courseIDs = getAllSelectedCourses();
    var HasCourses = true;
    for (let index = 0; index < courseIDs.length; index++) {
        if (global.currUser.courses[courseIDs[index].split(":")[0]] == null)
            HasCourses = false;
    }
    if (courseIDs.length > 0 && HasCourses)
        document.getElementById("removeFromPlanner").disabled = false;
}
function RemoveModules()
{
    var courseIDs = getAllSelectedCourses();
    for (let index = 0; index < courseIDs.length; index++) {
        global.currUser.DeleteCourse(courseIDs[index].split(":")[0]);
    }
    FetchCourses();
    createModulesTable();
    document.getElementById("removeFromPlanner").disabled = true;
}
function ShowModal() 
{
    /* This function is to handle "Add to Planner" button */
    var courseIds = getAllSelectedCourses();
    // If checked at least 1 checkboxes
    if (courseIds.length > 0) 
    {
        createForm(document.getElementById("addToPlannerModalBody"), courseIds)
        document.getElementById("buttonToAdd").disabled = false;
    }
    // If DID NOT pressed search before "Add to Planner" or no courses selected
    else {
        document.getElementById("addToPlannerModalBody").innerText = "Please select at least 1 module";
        document.getElementById("buttonToAdd").disabled = true;
    }
}

function createForm(modalBody, courseIds) {
    console.log("Start createForm");
    // <label for="course" class="form-label">${course}</label>
    /* Creates form in modal */
    modalBody.innerHTML = ""
    for (let course of courseIds) {
        var temp = course.split(":")
        var form = `<form id="selectSemester">
                <div class="row mb-3 justify-content-center">
                    <div class="col-5">
                         <label for="course" class="form-label">${course}</label>
                    </div>
                    <div class="col-5">
                        <select id = "${temp[0]}_dropdown" class="form-select" aria-label="semester">
                            <option value="Y1S1">Y1S1</option>
                            <option value="Y1S2">Y1S2</option>
                            <option value="Y1S3a">Y1S3a</option>
                            <option value="Y1S3b">Y1S3b</option>
                            <option value="Y2S1">Y2S1</option>
                            <option value="Y2S2">Y2S2</option>
                            <option value="Y2S3a">Y2S3a</option>
                            <option value="Y2S3b">Y2S3b</option>
                            <option value="Y3S1">Y3S1</option>
                            <option value="Y3S2">Y3S2</option>
                            <option value="Y3S3a">Y3S3a</option>
                            <option value="Y3S3b">Y3S3b</option>
                            <option value="Y4S1">Y4S1</option>
                            <option value="Y4S2">Y4S2</option>
                        </select>
                    <div>
                </div>
            </form>`
            modalBody.innerHTML += form;
    }
}

function AddToPlanner()
{
    /* This function adds to database when course is selected and then withdraws from database latest update*/

    for (let index = 0; index < SelectedCoursesList.length; index++) {
        const element = SelectedCoursesList[index];
        var yearAndSemTaken = document.getElementById(element.courseCode+"_dropdown").value;
        global.currUser.AddNewCourse(element.courseCode, yearAndSemTaken);
    }
    FetchCourses();
    createModulesTable();
    //console.log(global.currUser.courses);
}

function searchCourse(searchVal = "") 
{
    /* This function deals with searches when user use to search function*/

    // Handle search button when pressed
    SearchCourses = []
    if (searchVal != "")
        document.getElementById("searchInput").value = searchVal;
    var searchInput = document.getElementById("searchInput").value;
    searchInput = searchInput.trim();

    // Based on if user input anything or not
    if (searchInput==="") {
        createModulesTable('All Tracks')
    }
    else {
        for (var data_item of Courses) 
        {
            if (data_item.courseName.toLowerCase().indexOf(searchInput.toLowerCase()) != -1 || data_item.courseCode.toLowerCase().indexOf(searchInput.toLowerCase()) != -1) {
                SearchCourses.push(data_item);
            }
        }
        createModulesTable('All Tracks', true)
    }
}

// Acts like "import"
document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem("currUser") == "null" || sessionStorage.getItem("currUser") == null )
    {
        window.location.href = "index.html";
        return;
    }
    global.SetCurrentUser(JSON.parse(sessionStorage.getItem("currUser")));
    global.SetAllCourses(JSON.parse(sessionStorage.getItem("allCourses")));
    document.getElementById("nameheader").textContent = global.currUser.username.replace(/_+$/, ' ');
    document.getElementById("profileData").textContent = `Current Sem: ${global.currUser.currentYearAndSem} | GPA: ${(Math.round(global.currUser.gpa * 100) / 100).toFixed(2)}`;
    // console.log(global.currUser);
    FetchCourses();
    createModulesTable();
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('c');
    if (myParam != null)
        searchCourse(myParam);
    // For the search button
    document.getElementById("searchBtn").onclick = function() {searchCourse();}
    
    // For the filtering onchange
    document.getElementById("filterOptions").onchange = function() {editModulesTable()}

    // For the 'Add to my Planner' button
    document.getElementById("addToPlanner").onclick = function() {ShowModal()}
    document.getElementById("removeFromPlanner").onclick = function(){RemoveModules();}
    document.getElementById("removeFromPlanner").disabled = true;

    document.getElementById("buttonToAdd").onclick = function() {AddToPlanner();};
    document.getElementById("logoutBtn").onclick = function() {global.logout();};
    document.getElementById("searchInput").addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("searchBtn").click();
        }
      });
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
function adjustCourseTableHeight() {
    var height = window.innerHeight - 320;
    var courseTable = document.getElementById("courseTable");
  
    if (courseTable) {
      courseTable.style.height = height + "px";
    }
  }
  
  window.addEventListener("load", adjustCourseTableHeight);
  window.addEventListener("resize", adjustCourseTableHeight);
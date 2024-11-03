// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import  { getDatabase, ref, get, set, child, onValue, onChildAdded, onChildChanged, onChildRemoved}  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import  { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut}  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as global from './global.js';
// Your web app's Firebase configuration

document.addEventListener('DOMContentLoaded', function() {
  //ShowNumberOfUsers();
  global.SetCurrentUser(JSON.parse(sessionStorage.getItem("currUser")));
  global.SetAllCourses(JSON.parse(sessionStorage.getItem("allCourses")));
  UpdateCoursesList();
  document.getElementById("logoutBtn").onclick = function() {global.logout();};
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/auth.user
  const uid = global.currUser.uid;
  // Remove trailing underscores using regular expression

  FetchUsersCourses();
  document.getElementById("nameheader").textContent = global.currUser.username.replace(/_+$/, ' ');

  document.getElementById("banner_name").textContent = `Welcome back, ${global.currUser.username ? global.currUser.username.replace(/_+$/, '') : 'User'}!`;
	
	document.getElementById("profileData").textContent = `Current Sem: ${global.currUser.currentYearAndSem} | GPA: ${(Math.round(global.currUser.gpa * 100) / 100).toFixed(2)}`;
})

//Get Current Date
function formatDate(date) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

  const currentDateElement = document.getElementById('currentDate');
  const currentDate = new Date();
  currentDateElement.textContent = formatDate(currentDate);

function FillCourseList(enrolledCoursesCarousel, courses, showDeleteBtn = true)
{
  var courseCodes = Object.keys(courses);
  
  let totalCards = courseCodes.length;
  let cardsPerSlide = 3; // Default for tablet/laptop

  // Determine cards per slide based on screen size
  if (window.innerWidth >= 1500) { // Desktop
    cardsPerSlide = 4; // Adjust as needed
  } else if (window.innerWidth >= 992) { // Laptop
    cardsPerSlide = 3;
  } else if (window.innerWidth >= 768) { // Tablet
    cardsPerSlide = 2;
  } else { // Mobile
    cardsPerSlide = 1;
  }

  let totalSlides = Math.ceil(totalCards / cardsPerSlide);
  
  enrolledCoursesCarousel.innerHTML = '';

  for (let i = 0; i < totalSlides; i++) {
    let carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item';
    if (i === 0) {
      carouselItem.className += ' active';
    }

    let cardDeck = document.createElement('div');
    cardDeck.className = 'card-deck d-flex justify-content-center';

    let cardsToShow = Math.min(cardsPerSlide, totalCards - (i * cardsPerSlide));
    
    for (let j = 0; j < cardsPerSlide; j++) {
      if (j < cardsToShow) {
        let cardIndex = (i * cardsPerSlide + j);
        let courseCode = courseCodes[cardIndex];
        
        // Fetch the course name for the current course code
        let courseName = global.Course.GetByCourseCode(courseCode).courseName;
        let courseDescription = global.Course.GetByCourseCode(courseCode).courseDescription;

        // Card
        let card = document.createElement('div');
        card.className = 'card mb-3';

        // Row and columns
        let row = document.createElement('div');
        row.className = 'row g-0';

        let colText = document.createElement('div');
        colText.className = 'col-md-8';

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        let cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = courseCode;

        let courseNameElement = document.createElement('p');
        courseNameElement.className = 'card-course-name';
        courseNameElement.textContent = courseName;

        let cardText = document.createElement('p');
        cardText.className = 'card-text';

        let cardText2 = document.createElement('p');
        cardText2.className = 'card-text2';
        //Button
        let viewButton = document.createElement('a');
        viewButton.className = 'btn-course';
        viewButton.setAttribute('href', `catalog.html?c=${courseName}`);

        //View Button
        viewButton.setAttribute("type", "button");
        viewButton.setAttribute("class", "btn-course");
        // viewButton.setAttribute("data-bs-toggle", "modal");
        // viewButton.setAttribute("data-bs-target",`#Modal_${courseCode}`);
        viewButton.textContent = 'View';
        var deleteButton = null
        if (showDeleteBtn)
        {
          deleteButton = document.createElement('a');
          deleteButton.className = 'btn-course-delete';
          deleteButton.setAttribute('href', '#');

          //Delete Button
          deleteButton.setAttribute("type", "button");
          deleteButton.setAttribute("class", "btn-course-delete");
          deleteButton.onclick = function() {
            global.currUser.DeleteCourse(courseCode);
            UpdateCoursesList();
          };
          var trashImg = document.createElement("img");
          trashImg.setAttribute('src', "images/trash.png");
          trashImg.style.height = "25px"
          trashImg.style.width = "25px"
          deleteButton.appendChild(trashImg);
        }

        // Create Modal
        createCourseModal(courseCode,courseName,courseDescription );
        

        cardText.appendChild(viewButton);
        cardText2.appendChild(cardTitle);
        if (showDeleteBtn)
          cardText2.appendChild(deleteButton);
        cardBody.appendChild(courseNameElement);
        cardBody.appendChild(cardText);
        colText.appendChild(cardBody);

        let colImg = document.createElement('div');
        colImg.className = 'col-md-4';

        let img = document.createElement('img');
        img.src = 'images/com.png';
        img.className = 'img-fluid rounded-start d-none d-md-block';

        colImg.appendChild(img);
        row.appendChild(colText);
        row.appendChild(colImg);
        card.appendChild(cardText2);
        card.appendChild(row);
        cardDeck.appendChild(card);
      } else {
        let emptyCard = document.createElement('div');
        emptyCard.className = 'card mb-3';
        emptyCard.style.visibility = 'hidden';
        cardDeck.appendChild(emptyCard);
      }
    }
    carouselItem.appendChild(cardDeck);
    enrolledCoursesCarousel.appendChild(carouselItem);
  }
}
function UpdateCoursesList() {
  var courses = global.currUser.GetAllCourseYearAndSemTaken();
  var currentYear = global.currUser.currentYearAndSem.split("S")[0].split("Y")[1];
  var currentSem = global.currUser.currentYearAndSem.split("S")[1];
  if (currentSem == "3a")
    currentSem = 3;
  if (currentSem == "3b")
    currentSem = 4;
  var enrolledcourses = {};
  var plannedcourses = {};
  var recommendedcourses = {};
  var completedcourses = {};
  for (var course in courses)
  {
    var courseYear = courses[course].split("S")[0].split("Y")[1];
    var courseSem = courses[course].split("S")[1];
    if (courseSem == "3a")
      courseSem = 3;
    if (courseSem == "3b")
      courseSem = 4;
    if (courseSem == currentSem && courseYear == currentYear)
      enrolledcourses[course] = courses[course];
    else if (courseSem > currentSem && courseYear == currentYear || courseYear > currentYear)
      plannedcourses[course] = courses[course];
    else if (courseSem < currentSem && courseYear == currentYear || courseYear < currentYear)
      completedcourses[course] = courses[course];
  }
  for (var course of global.Course.GetAllCoursesForDegree())
  {
    if (global.currUser.GetAllCourseYearAndSemTaken() != null && global.currUser.GetAllCourseYearAndSemTaken()[course.courseCode] == null)
    {
      recommendedcourses[course.courseCode] = course.GetDegreeSpecificRecommendedDate();
    }
  }
  FillCourseList(document.getElementById("enrolledCarousel").children[0], enrolledcourses);
  FillCourseList(document.getElementById("plannedCarousel").children[0], plannedcourses);
  FillCourseList(document.getElementById("recommendedCarousel").children[0], recommendedcourses, false);
  FillCourseList(document.getElementById("completedCarousel").children[0], completedcourses);
}

function createCourseModal(courseCode, courseName, courseDescription) {
  let modalsContainer = document.getElementById("modals");

  let modalDiv = document.createElement('div');
  modalDiv.className = 'modal fade';
  modalDiv.id = `Modal_${courseCode}`;
  modalDiv.setAttribute('tabindex', '-1');
  modalDiv.setAttribute('aria-labelledby', `Modal_${courseCode}`);
  modalDiv.setAttribute('aria-hidden', 'true');

  let modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog';

  let modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  let modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';

  let modalTitle = document.createElement('h1');
  modalTitle.className = 'modal-title fs-5';
  modalTitle.id = `Modal_${courseCode}`;
  modalTitle.textContent = courseName;

  let closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'btn-close';
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  closeButton.setAttribute('aria-label', 'Close');

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  let modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  modalBody.textContent = courseDescription;

  let modalFooter = document.createElement('div');
  modalFooter.className = 'modal-footer';

  let closeFooterButton = document.createElement('button');
  closeFooterButton.type = 'button';
  closeFooterButton.className = 'btn btn-secondary';
  closeFooterButton.setAttribute('data-bs-dismiss', 'modal');
  closeFooterButton.textContent = 'Close';

  modalFooter.appendChild(closeFooterButton);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modalDiv.appendChild(modalDialog);
  
  modalsContainer.appendChild(modalDiv);
}



// Optionally, call the function on window resize to adapt to size changes
window.addEventListener('resize', UpdateCoursesList);

function FetchUsersCourses()
{
  var courseTable = document.getElementById("courseTable");
  get(global.coursesRef, "courses").then((snapshot) => {
    if (snapshot.exists()) {
      var result = snapshot.val();
      var values = Object.values(result);


      for (var key of Object.keys(result)) {
          // this will give you the key & values for all properties
          var temp = result[key];
          var currCourse = new global.Course(temp["courseCode"], temp["courseName"]);
          
          //console.log(key + " -> " + user.username + " , " + user.gpa);
          // .. process the data here! 
      }
    }
    else
    {
    }
  });
  
}


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
  sessionStorage.setItem("currUser",  JSON.stringify(global.currUser));
  document.getElementById("profileData").textContent = `Current Sem: ${global.currUser.currentYearAndSem} | GPA: ${(Math.round(global.currUser.gpa * 100) / 100).toFixed(2)}`;
  //alert("Details saved successfully!");

  // Close the modal after saving
  location.reload();
}

// Trigger save on button click
saveDetailsBtn.addEventListener('click', saveDetails);

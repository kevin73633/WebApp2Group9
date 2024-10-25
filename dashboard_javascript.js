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

function UpdateCoursesList() {
  var enrolledCoursesCarousel = document.querySelector(".carousel-inner");
  var courses = global.currUser.courses;
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

        let viewButton = document.createElement('a');
        viewButton.className = 'btn-course';
        viewButton.setAttribute('href', '#');
        viewButton.setAttribute('role', 'button');
        viewButton.textContent = 'View';

        cardText.appendChild(viewButton);
        cardBody.appendChild(cardTitle);
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
  //global.currUser.SetInitialValues(global.currUser.username, gpaValue, degree, year + semester)
  //alert("Details saved successfully!");

  // Close the modal after saving
  $('#userDetailsModal').hide();
}

// Trigger save on button click
saveDetailsBtn.addEventListener('click', saveDetails);

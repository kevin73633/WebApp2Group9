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
  console.log(global.currUser);
  UpdateCoursesList();
  onAuthStateChanged(global.auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      
      let str = user.displayName;
      // Remove trailing underscores using regular expression
      let trimmedStr = str.replace(/_+$/, ' ');

      document.getElementById("nameheader").textContent = trimmedStr;
      FetchUsersCourses();
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
	//window.onmousemove  = function() {myFunction()};
	
	
})

// added for dashboardbanner line 88 block
document.addEventListener('DOMContentLoaded', function() {
  onAuthStateChanged(global.auth, (user) => {
    if (user) {
      const uid = user.uid;
      
      let str = user.displayName;
      let trimmedStr = str ? str.replace(/_+$/, '') : 'User';

      document.getElementById("banner_name").textContent = `Welcome back, ${trimmedStr}!`;
      
      FetchUsersCourses();
    }
  });
});

function UpdateCoursesList() {
  var enrolledCoursesCarousel = document.querySelector(".carousel-inner");
  var courses = global.currUser.courses;
  var courseCodes = Object.keys(courses);
  
  let totalCards = courseCodes.length;
  let totalSlides = totalCards;
  
  enrolledCoursesCarousel.innerHTML = '';

  for (let i = 0; i < totalSlides; i++) {

    let carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item';
    if (i === 0) {
      carouselItem.className += ' active';
    }

    let cardDeck = document.createElement('div');
    cardDeck.className = 'card-deck d-flex justify-content-center';

    // 3 cards to each slide
    for (let j = 0; j < 3; j++) {
      let cardIndex = (i + j) % totalCards;
      let courseCode = courseCodes[cardIndex];

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

      let cardText = document.createElement('p');
      cardText.className = 'card-text';

      let viewButton = document.createElement('a');
      viewButton.className = 'btn btn-primary';
      viewButton.setAttribute('href', '#');
      viewButton.setAttribute('role', 'button');
      viewButton.textContent = 'View';

      cardText.appendChild(viewButton);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      colText.appendChild(cardBody);

      let colImg = document.createElement('div');
      colImg.className = 'col-md-4';

      let img = document.createElement('img');
      img.src = 'images/com.png';
      img.className = 'img-fluid rounded-start';

      colImg.appendChild(img);
      row.appendChild(colText);
      row.appendChild(colImg);
      card.appendChild(row);
      cardDeck.appendChild(card);
    }
    carouselItem.appendChild(cardDeck);
    enrolledCoursesCarousel.appendChild(carouselItem);
  }
}



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
      CreateNewCourse(new Course("IS111", "Intro to programming"));
    }
  });
  
}



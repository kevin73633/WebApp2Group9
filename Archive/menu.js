// let darkmode = localStorage.getItem('darkmode')
// themeSwitch = document.getElementById("theme")

// enableDarkmode = () => {
//     document.body.classList.add('darkmode')
//     localStorage.setItem('darkmode', 'active')
// }

// disableDarkmode = () => {
//     document.body.classList.remove('darkmode')
//     localStorage.setItem('darkmode', null)
// }
// if(darkmode==="active") enableDarkmode()
// themeSwitch.addEventListener("click", () =>{
//     darkmode = localStorage.getItem('darkmode')
//     darkmode !== "active" ? enableDarkmode() : disableDarkmode()
// })

// function responsiveNav(){
//     sideNav = document.getElementById("sidebar");
//     hamburger = document.getElementById("toggleSidebar");
//     mainContent = document.getElementById("content")
//     logo = document.getElementById("logo")
//     iconText = document.getElementsByClassName("icon-text")
//     MenuMinimise = document.getElementById("desktopMenuMinimise")
//     MenuExtend = document.getElementById("desktopMenuExpand")

//     topNav = document.getElementById("navbartop")

//     if (window.innerWidth<480){
//         sideNav.style.display = "none"
//         hamburger.style.display = "block";
//         mainContent.style.marginLeft="0";
//         topNav.style.marginLeft="0"
//         MenuMinimise.style.display="none"
//         MenuExtend.style.display="none"
//     }else{
//         sideNav.style.display = "block"
//         sideNav.style.width = "80px"
//         sideNav.style.padding = "0"
//         hamburger.style.display = "none"
//         mainContent.style.marginLeft="80px";
//         topNav.style.marginLeft="80px"
//         logo.style.display = "none"
//         for (var i = 0; i < iconText.length; i++) {
//             iconText[i].style.display = "none";
//         }
//         MenuMinimise.style.display = "none"
//         MenuExtend.style.display = "block"
//     }
// }

// function expandSidebar(){
//     sideNav = document.getElementById("sidebar");
//     hamburger = document.getElementById("toggleSidebar");
//     mainContent = document.getElementById("content")
//     logo = document.getElementById("logo")
//     icontext = document.getElementsByClassName("icon-text")

//     MenuMinimise = document.getElementById("desktopMenuMinimise")
//     MenuExtend = document.getElementById("desktopMenuExpand")

//     topNav = document.getElementById("navbartop")

//     sideNav.style.width = "280px"
//     logo.style.display = "block"

//     for (var i = 0; i < iconText.length; i++) {
//         iconText[i].style.display = "inline-flex";
//         iconText[i].style.alignItems = "center";
//     }

//     topNav.style.marginLeft="280px"
//     mainContent.style.marginLeft="280px"
//     mainContent.style.paddingLeft="30px"
//     mainContent.style.paddingRight="30px"

//     MenuMinimise.style.display = "block"
//     MenuExtend.style.display = "none"
// }

// function minimiseSidebar(){
//     sideNav = document.getElementById("sidebar");
//     mainContent = document.getElementById("content")
//     logo = document.getElementById("logo")
//     icontext = document.getElementsByClassName("icon-text")

//     MenuMinimise = document.getElementById("desktopMenuMinimise")
//     MenuExtend = document.getElementById("desktopMenuExpand")
//     topNav = document.getElementById("navbartop")

//     sideNav.style.width = "80px"
//     logo.style.display = "none"
//     for (var i = 0; i < iconText.length; i++){
//         iconText[i].style.display = "none"
//     }
//     mainContent.style.marginLeft = "80px"
//     mainContent.style.paddingLeft = "80px"
//     mainContent.style.paddingRight = "80px"
    
//     topNav.style.marginLeft="80px"

//     MenuMinimise.style.display = "none"
//     MenuExtend.style.display = "block"
// }

// function mobileNav(){
//     crossHamburger = document.getElementById("mobileToggleSideBar");
//     sideNav = document.getElementById("sidebar");
//     sideNav.style.display = "block"
//     sideNav.style.zIndex =999999;
//     logo = document.getElementById("logo")
//     iconText = document.getElementsByClassName("icon-text")
//     sideNav.style.width = "300px"
//     logo.style.display = "block"

//     for (var i = 0; i < iconText.length; i++) {
//         iconText[i].style.display = "inline-flex";
//         iconText[i].style.alignItems = "center";
//     }
//     crossHamburger.style.position = "absolute";
//     crossHamburger.style.top = "45px";
//     crossHamburger.style.right = "10px";
//     crossHamburger.classList.remove("d-none");
//     crossHamburger.classList.remove("d-none");

//     overlay = document.createElement("div");
//     overlay.id = "overlay";
//     overlay.style.position = "fixed";
//     overlay.style.top = 0;
//     overlay.style.left = 0;
//     overlay.style.width = "100%";
//     overlay.style.height = "100%";
//     overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
//     overlay.style.zIndex = 999998;
//     document.body.appendChild(overlay);

//     overlay.addEventListener("click", function () {
//         minMobileNav();
//     });
// }

// function minMobileNav() {
//     crossHamburger = document.getElementById("mobileToggleSideBar");
//     crossHamburger.classList.add("d-none");

//     sideNav = document.getElementById("sidebar");
//     sideNav.style.display = "none";

//     overlay = document.getElementById("overlay");
//     if (overlay) {
//         overlay.remove();
//     }
// }
// responsiveNav();
// window.onresize = responsiveNav;

function responsiveNav(){
    sideNav = document.getElementById("sidebar");
    hamburger = document.getElementById("toggleSidebar");
    mainContent = document.getElementById("content")
    logo = document.getElementById("logo")
    iconText = document.getElementsByClassName("icon-text")
    MenuMinimise = document.getElementById("desktopMenuMinimise")
    MenuExtend = document.getElementById("desktopMenuExpand")

    topNav = document.getElementById("navbartop")

    if (window.innerWidth<600){
        sideNav.style.display = "none"
        hamburger.style.display = "block";
        mainContent.style.marginLeft="0";
        mainContent.style.paddingLeft="0";
        mainContent.style.paddingRight="0";
        topNav.style.marginLeft="0"
        MenuMinimise.style.display="none"
        MenuExtend.style.display="none"

    }else{
        
        sideNav.style.display = "block"
        sideNav.style.width = "80px"
        sideNav.style.padding = "0"
        hamburger.style.display = "none"
        mainContent.style.marginLeft="80px";
        mainContent.style.paddingLeft="30px";
        mainContent.style.paddingRight="30px";

        topNav.style.marginLeft="80px"
        
        logo.style.display = "none"
        for (var i = 0; i < iconText.length; i++) {
            iconText[i].style.display = "none";
        }
        MenuMinimise.style.display = "none"
        MenuExtend.style.display = "block"

    }
}
function expandSidebar(){
    console.log("expand")
    sideNav = document.getElementById("sidebar");
    hamburger = document.getElementById("toggleSidebar");
    mainContent = document.getElementById("content")
    logo = document.getElementById("logo")
    icontext = document.getElementsByClassName("icon-text")

    MenuMinimise = document.getElementById("desktopMenuMinimise")
    MenuExtend = document.getElementById("desktopMenuExpand")

    topNav = document.getElementById("navbartop")

    sideNav.style.width = "250px"
    logo.style.display = "block"

    for (var i = 0; i < iconText.length; i++) {
        iconText[i].style.display = "inline-flex";
        iconText[i].style.alignItems = "center";
    }

    topNav.style.marginLeft="250px"
    mainContent.style.marginLeft="250px"
    mainContent.style.paddingLeft="30px"
    mainContent.style.paddingRight="30px"

    MenuMinimise.style.display = "block"
    MenuExtend.style.display = "none"

}

function minimiseSidebar(){
    sideNav = document.getElementById("sidebar");
    mainContent = document.getElementById("content")
    logo = document.getElementById("logo")
    icontext = document.getElementsByClassName("icon-text")

    MenuMinimise = document.getElementById("desktopMenuMinimise")
    MenuExtend = document.getElementById("desktopMenuExpand")
    topNav = document.getElementById("navbartop")

    sideNav.style.width = "80px"
    logo.style.display = "none"
    for (var i = 0; i < iconText.length; i++){
        iconText[i].style.display = "none"
    }
    mainContent.style.marginLeft = "80px"
    mainContent.style.paddingLeft = "80px"
    mainContent.style.paddingRight = "80px"
    
    topNav.style.marginLeft="80px"

    MenuMinimise.style.display = "none"
    MenuExtend.style.display = "block"
}

function mobileNav(){
    console.log("hello")
    sideNav = document.getElementById("sidebar");
    sideNav.style.display = "block"
    sideNav.style.zIndex =999999;
    logo = document.getElementById("logo")
    iconText = document.getElementsByClassName("icon-text")
    sideNav.style.width = "250px"
    logo.style.display = "block"

    for (var i = 0; i < iconText.length; i++) {
        iconText[i].style.display = "inline-flex";
        iconText[i].style.alignItems = "center";
    }
}


responsiveNav();
window.onresize = responsiveNav;
function responsiveNav(){
    sideNav = document.getElementById("sidebar");
    hamburger = document.getElementById("toggleSidebar");
    mainContent = document.getElementById("content")
    logo = document.getElementById("logo")
    icontext = document.getElementsByClassName("icon-text")
    desktopMenu = document.getElementById("desktopToggleSidebar")
    MenuExtend = document.getElementById("desktopMenuExpand")


    if (window.innerWidth<600){
        sideNav.style.display = "none"
        hamburger.style.display = "block";
        mainContent.style.marginLeft="0";
        mainContent.style.paddingLeft="0";
        mainContent.style.paddingRight="0";
        desktopMenu.style.display="none"
        MenuExtend.style.display="none"

    }else{
        sideNav.style.display = "block"
        sideNav.style.width = "80px"
        sideNav.style.padding = "0"
        hamburger.style.display = "none"
        mainContent.style.marginLeft="80px";
        mainContent.style.paddingLeft="30px";
        mainContent.style.paddingRight="30px";
        
        logo.style.display = "none"
        for (var i = 0; i < icontext.length; i++) {
            icontext[i].style.display = "none";
        }

    }
}
function expandSidebar(){

    sideNav = document.getElementById("sidebar");
    hamburger = document.getElementById("toggleSidebar");
    mainContent = document.getElementById("content")
    logo = document.getElementById("logo")
    icontext = document.getElementsByClassName("icon-text")

    sideNav.style.width = "250px"
    logo.style.display = "block"
    for (var i = 0; i < icontext.length; i++) {
        icontext[i].style.display = "inline-flex";
        icontext[i].style.alignItems = "center";
    }

    mainContent.style.marginLeft="250px";
    mainContent.style.paddingLeft="30px";
    mainContent.style.paddingRight="30px";

}
responsiveNav();
window.onresize = responsiveNav;
function responsiveNav(){
    sideNav = document.getElementById("sidebar");
    hamburger = document.getElementById("toggleSidebar");
    mainContent = document.getElementById("content")
    if (window.innerWidth<600){
        sideNav.style.display = "none"
        hamburger.style.display = "block";
        mainContent.style.marginLeft="0";
        mainContent.style.paddingLeft="0";
        mainContent.style.paddingRight="0";
    }else{
        sideNav.style.display = "block"
        hamburger.style.display = "none"
        mainContent.style.marginLeft="250px";
        mainContent.style.paddingLeft="30px";
        mainContent.style.paddingRight="30px";
    }
}
responsiveNav();
window.onresize = responsiveNav;
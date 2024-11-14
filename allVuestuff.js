const app = Vue.createApp({

})

app.component('user-details-menu', {
    data() {
        return {
            degrees: {
                "CS":"Computer Science",
                "IS":"Information Systems",
                "SE":"Software Engineering",
                "C&L":"Computing and Law",
            },
            years: {
                "Y1":"Year 1",
                "Y2":"Year 2",
                "Y3":"Year 3",
                "Y4":"Year 4",
            },
            semesters: {
                "S1": "Semester 1",
                "S2": "Semester 2",
                "S3a": "Semester 3a",
                "S3b": "Semester 3b",
            }
        }
    },
    template: `
        <div class="modal" id="userDetailsModal" tabindex="-1" aria-labelledby="userDetailsModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header modal-header-border">
                        <h5 class="modal-title" id="userDetailsModalLabel">Provide Your Academic Details</h5>
                        <button type="button" class="btn-close btn-close-white " data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="userDetailsForm">
                            <!-- Degree Input -->
                            <div class="mb-3">
                                <label for="degreeInput" class="form-label">Degree</label>
                                <select class="form-select" id="degreeInput">
                                    <option v-for="(degree, degree_id) in degrees" :value="degree_id">{{degree}}</option>
                                </select>
                            </div>
        
                            <!-- GPA Input -->
                            <div class="mb-3">
                                <label for="gpaInput" class="form-label">GPA</label>
                                <input type="number" step="0.01" min="0.01" max="4.3" class="form-control form-control-input" id="gpaInput"
                                    placeholder="Enter your GPA">
                                <span class="error" id="gpaError"></span>
                            </div>
        
                            <!-- Current Year Input -->
                            <div class="mb-3">
                                <label for="yearInput" class="form-label">Current Year</label>
                                <select class="form-select" id="yearInput">
                                    <option v-for="(year, year_id) in years" :value="year_id">{{year}}</option>
                                </select>
                            </div>
        
                            <!-- Semester Input -->
                            <div class="mb-3">
                                <label for="semesterInput" class="form-label">Semester</label>
                                <select class="form-select" id="semesterInput">
                                    <option v-for="(semester, semester_id) in semesters" :value="semester_id">{{semester}}</option>
                                </select>
                            </div>
                            <div class="error" id="saveDetailsError"></div>
                        </form>
                    </div>
                    <div class="modal-footer modal-footer-border">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-modal" id="saveDetailsBtn">Save Details</button>
                    </div>
                </div>
            </div>
        </div>
    `
})

app.component('profile-top', {
    template: `
        <div id="profile_top" class="d-flex align-items-center">
            <div class="me-3 d-none d-sm-block profile_name">
                <strong id="nameheader">Nil</strong>
                <small id = "profileData">XXXX year, X.XX GPA</small>
            </div>	
                        <button type="button" id="ProfileBtn" data-bs-toggle="modal" data-bs-target="#userDetailsModal">
                <img src="images/default.jpg" alt="Profile" width="32" height="32" class="rounded-circle me-2">
            </button>
		</div>
    `
})
{/* <i class="fas fa-bars"></i> */}
app.component('hamburger-button', {
    template: `
        <button id="toggleSidebar" class="btn" @click="mobileNav()">
            <i class="fas fa-bars"></i>
        </button>    
        <button id="desktopMenuExpand" class="btn" @click="expandSidebar()">
            <i class="fas fa-bars"></i>
        </button> 
        <button id="desktopMenuMinimise" class="btn" @click="minimiseSidebar()">
            <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.70710678,12 L19.5,12 C19.7761424,12 20,12.2238576 20,12.5 C20,12.7761424 19.7761424,13 19.5,13 L8.70710678,13 L11.8535534,16.1464466 C12.0488155,16.3417088 12.0488155,16.6582912 11.8535534,16.8535534 C11.6582912,17.0488155 11.3417088,17.0488155 11.1464466,16.8535534 L7.14644661,12.8535534 C6.95118446,12.6582912 6.95118446,12.3417088 7.14644661,12.1464466 L11.1464466,8.14644661 C11.3417088,7.95118446 11.6582912,7.95118446 11.8535534,8.14644661 C12.0488155,8.34170876 12.0488155,8.65829124 11.8535534,8.85355339 L8.70710678,12 L8.70710678,12 Z M4,5.5 C4,5.22385763 4.22385763,5 4.5,5 C4.77614237,5 5,5.22385763 5,5.5 L5,19.5 C5,19.7761424 4.77614237,20 4.5,20 C4.22385763,20 4,19.7761424 4,19.5 L4,5.5 Z"/>
    </svg>
        </button>
    `,
    methods: {
        expandSidebar() {
            sideNav = document.getElementById("sidebar");
            hamburger = document.getElementById("toggleSidebar");
            mainContent = document.getElementById("content")
            logo = document.getElementById("logo")
            icontext = document.getElementsByClassName("icon-text")
        
            MenuMinimise = document.getElementById("desktopMenuMinimise")
            MenuExtend = document.getElementById("desktopMenuExpand")
        
            topNav = document.getElementById("navbartop")
        
            sideNav.style.width = "280px"
            sideNav.classList.remove('minimized');
            logo.style.display = "block"
        
            for (var i = 0; i < iconText.length; i++) {
                iconText[i].style.display = "inline-flex";
                iconText[i].style.alignItems = "center";
            }
        
            topNav.style.marginLeft="280px"
            mainContent.style.marginLeft="280px"
            mainContent.style.paddingLeft="30px"
            mainContent.style.paddingRight="30px"
        
            MenuMinimise.style.display = "block"
            MenuExtend.style.display = "none"
        },
        minimiseSidebar() {
            sideNav = document.getElementById("sidebar");
            mainContent = document.getElementById("content")
            logo = document.getElementById("logo")
            icontext = document.getElementsByClassName("icon-text")
        
            MenuMinimise = document.getElementById("desktopMenuMinimise")
            MenuExtend = document.getElementById("desktopMenuExpand")
            topNav = document.getElementById("navbartop")
        
            sideNav.style.width = "80px"
            sideNav.classList.add('minimized');
            logo.style.display = "none"
            for (var i = 0; i < iconText.length; i++){
                iconText[i].style.display = "none"
            }
            mainContent.style.marginLeft = "80px"
            mainContent.style.paddingLeft = "20px"
            mainContent.style.paddingRight = "20px"
            
            topNav.style.marginLeft="80px"
        
            MenuMinimise.style.display = "none"
            MenuExtend.style.display = "block"
        },
        mobileNav(){
            crossHamburger = document.getElementById("mobileToggleSideBar");
            sideNav = document.getElementById("sidebar");
            sideNav.style.display = "block"
            sideNav.style.zIndex =999999;
            logo = document.getElementById("logo")
            iconText = document.getElementsByClassName("icon-text")
            sideNav.style.width = "300px"
            logo.style.display = "block"
        
            for (var i = 0; i < iconText.length; i++) {
                iconText[i].style.display = "inline-flex";
                iconText[i].style.alignItems = "center";
            }
            crossHamburger.style.position = "absolute";
            crossHamburger.style.top = "45px";
            crossHamburger.style.right = "10px";
            crossHamburger.classList.remove("d-none");
            crossHamburger.classList.remove("d-none");
        
            overlay = document.createElement("div");
            overlay.id = "overlay";
            overlay.style.position = "fixed";
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            overlay.style.zIndex = 999998;
            document.body.appendChild(overlay);
            overlay.onclick = this.minMobileNav;
            
        },
        minMobileNav() {
            crossHamburger = document.getElementById("mobileToggleSideBar");
            crossHamburger.classList.add("d-none");
        
            sideNav = document.getElementById("sidebar");
            sideNav.style.display = "none";
        
            overlay = document.getElementById("overlay");
            if (overlay) {
                overlay.remove();
            }
        },
        responsiveNav(){
            sideNav = document.getElementById("sidebar");
            hamburger = document.getElementById("toggleSidebar");
            mainContent = document.getElementById("content")
            logo = document.getElementById("logo")
            iconText = document.getElementsByClassName("icon-text")
            MenuMinimise = document.getElementById("desktopMenuMinimise")
            MenuExtend = document.getElementById("desktopMenuExpand")
        
            topNav = document.getElementById("navbartop")
        
            if (window.innerWidth<480){
                sideNav.style.display = "none"
                hamburger.style.display = "block";
                mainContent.style.marginLeft="0";
                topNav.style.marginLeft="0"
                MenuMinimise.style.display="none"
                MenuExtend.style.display="none"
            }else{
                sideNav.classList.add('minimized');
                sideNav.style.display = "block"
                sideNav.style.width = "80px"
                sideNav.style.padding = "0"
                hamburger.style.display = "none"
                mainContent.style.marginLeft="80px";
                topNav.style.marginLeft="80px"
                logo.style.display = "none"
                for (var i = 0; i < iconText.length; i++) {
                    iconText[i].style.display = "none";
                }
                MenuMinimise.style.display = "none"
                MenuExtend.style.display = "block"
            }
        }
    },
    mounted() {
        this.responsiveNav();
        window.onresize = this.responsiveNav;
        document.getElementById("mobileToggleSideBar").onclick = this.minMobileNav;
        

    }
})

app.component('sidebar', {
    data() {
        return {
            names: {
                "Dashboard": ["dashboard.html","fas fa-home"],
                "Catalog": ["catalog.html", "fas fa-book"],
                "Planner": ["planner.html", "fas fa-calendar"],
            },
            pagename: ''
        }
    },
    created() {
        // Extract the page name from the URL
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1);
        
        // Set `pagename` based on the page filename (e.g., "dashboard.html" -> "Dashboard")
        this.pagename = Object.keys(this.names).find(key => this.names[key][0] === page) || '';
    },
    template:`
        <nav id="sidebar">
            <div class="side">
                <ul class="nav sidebar-nav d-flex flex-column">
                    <div id="header" class="d-flex flex-column align-items-start mb-1 px-3">
                        <img src="images/step_logo.png" alt="Logo" class="logo-img mb-3">
                        <div id="logo" class="text-start">
                            <h1 id="steps" class="fs-2">S T E P S</h1>
                            <p id="stepsTagline">SCIS TIMETABLE AND ENROLLMENT PLANNING SYSTEM</p>
                            <button id="mobileToggleSideBar" class="btn d-none">
                                <i class="fas fa-times text-white"></i>
                            </button>    
                        </div>
                    </div>
                    <li v-for="(attr, name) in names" class="nav-item">
                        <a :href="attr[0]" :class="['nav-link', pagename === name ? 'active' : 'text-white']" :data-tooltip="name">
                            <i :class="attr[1]" aria-hidden="true"></i>
                            <span class="icon-text">{{ name }}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" id="logoutBtn" class="nav-link text-white" data-tooltip="Logout">
                            <i class="	fas fa-sign-out-alt" aria-hidden="true"></i>
                            <span class="icon-text">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    `,
    mounted() {
        const sidebar = document.getElementById('sidebar');
        const tooltipElements = document.querySelectorAll('.nav-link');
    
        tooltipElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                // Check if the sidebar is minimized
                if (sidebar.classList.contains('minimized')) {
                    const tooltipText = el.getAttribute('data-tooltip');
                    const tooltipDiv = document.createElement('div');
                    tooltipDiv.className = 'custom-tooltip';
                    tooltipDiv.innerText = tooltipText;
                    sidebar.appendChild(tooltipDiv);
    
                    const rect = el.getBoundingClientRect();
                    tooltipDiv.style.position = 'absolute';
                    tooltipDiv.style.top = `${rect.top}px`;
                    tooltipDiv.style.left = `${rect.right + 20}px`; // Position tooltip to the right
                }
            });
    
            el.addEventListener('mouseleave', () => {
                const existingTooltip = document.querySelector('.custom-tooltip');
                if (existingTooltip) {
                    existingTooltip.remove();
                }
            });
        });
    }
})

app.component('dark-light-mode', {
    data() {
        return {
            isDarkMode: localStorage.getItem('darkmode') === 'active'
        };
    },
    mounted() {
        if (this.isDarkMode) {
            this.enableDarkMode();
        }
    },
    template: `
        <button id="theme" @click="toggleTheme" style="width: 32px; height: 32px;">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/>
            </svg>
        </button>
    `,
    methods: {
        enableDarkMode() {
            document.body.classList.add('darkmode');
            localStorage.setItem('darkmode', 'active');
            this.isDarkMode = true;
        },
        disableDarkMode() {
            document.body.classList.remove('darkmode');
            localStorage.setItem('darkmode', null);
            this.isDarkMode = false;
        },
        toggleTheme() {
            if (this.isDarkMode) {
                this.disableDarkMode();
            } else {
                this.enableDarkMode();
            }
        }
    }
});

const vm = app.mount("#app");
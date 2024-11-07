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
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="userDetailsModalLabel">Provide Your Academic Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                <input type="number" step="0.01" min="0.01" max="4.3" class="form-control" id="gpaInput"
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="saveDetailsBtn">Save Details</button>
                    </div>
                </div>
            </div>
        </div>
    `
})

app.component('profile-top', {
    template: `
        <div id="profile_top" class="d-flex align-items-center">
            <button type="button" id="ProfileBtn" data-bs-toggle="modal" data-bs-target="#userDetailsModal">
                <img src="images/justin1.jpg" alt="Profile" width="32" height="32" class="rounded-circle me-2">
            </button>
            <div class="me-3 d-none d-sm-block profile_name">
                <strong id="nameheader">Nil</strong>
                <small id = "profileData">XXXX year, X.XX GPA</small>
            </div>	
		</div>
    `
})

app.component('hamburger-button', {
    template: `
        <button id="toggleSidebar" class="btn" onclick="mobileNav()">
            <i class="fas fa-bars"></i>
        </button>    
        <button id="desktopMenuExpand" class="btn" onclick="expandSidebar()">
            <i class="fas fa-bars"></i>
        </button> 
        <button id="desktopMenuMinimise" class="btn" onclick="minimiseSidebar()">
            <i class="fas fa-bars"></i>
        </button>
    `
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
                    <div id="header" class="d-flex flex-column align-items-start mb-2 px-2">
                        <img src="images/step_logo.png" alt="Logo" class="logo-img mb-3">
                        <div id="logo" class="text-start">
                            <h1 id="steps" class="fs-2">S T E P S</h1>
                            <p id="stepsTagline">SCIS TIMETABLE AND ENROLLMENT PLANNING SYSTEM</p>
                            <button id="mobileToggleSideBar" class="btn d-none" onclick="minMobileNav()">
                                <i class="fas fa-times text-white"></i>
                            </button>    
                        </div>
                    </div>
                    <li v-for="(attr, name) in names" class="nav-item">
                        <a :href="attr[0]" :class="['nav-link', pagename === name ? 'active' : 'text-white']">
                            <i :class="attr[1]" aria-hidden="true"></i>
                            <span class="icon-text">{{ name }}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" id="logoutBtn" class="nav-link text-white">
                            <i class="	fas fa-sign-out-alt" aria-hidden="true"></i>
                            <span class="icon-text">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    `
})

const vm = app.mount("#app");
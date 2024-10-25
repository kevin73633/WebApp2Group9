// Import the functions you need from the SDKs you need
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { get, ref } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as global from './global.js';

//AUTH

const form = document.getElementById('form');
const provider = new GoogleAuthProvider();
document.getElementById('GoogleLoginBtn').addEventListener('click',function(){
  signInWithPopup(global.auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    // The signed-in user info.
    const user = result.user;
    
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
});

// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//  signInWithEmailAndPassword(auth, email, password)
//   .then((user) => {
//       if (user) {
//         alert('sucess');
//       }
//       // ...
//   })
//   .catch((error) => {
//       console.log("error: email or password is incorrect");
//   });
  
// });





document.addEventListener('DOMContentLoaded', function() {
  //ShowNumberOfUsers();
  onAuthStateChanged(global.auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      document.getElementById("GoogleLoginBtn").style.display = "none";
      get(global.coursesRef, "courses").then((snapshot) => {
        if (snapshot.exists()) {
            var result = snapshot.val();
    
            for (var key of Object.keys(result)) {
                // this will give you the key & values for all properties
                var temp = result[key];
                var currCourse = new global.Course(temp["courseCode"], temp["courseName"], temp["courseCategory"], temp["recommendedYearAndSem"], temp["courseDescription"]);
                //console.log(currCourse);
                global.allCourses.push(currCourse);
                //console.log(key + " -> " + user.username + " , " + user.gpa);
                // .. process the data here! 
            }
            var localuser =  ref(global.db, 'users/' + uid);
            get(localuser, `users/${uid}`).then((snapshot) => {
              if (snapshot.exists()) {
                console.log("User Exists!");
                var userData = snapshot.val();
                var userCourses = userData["courses"];
                if (userCourses == null)
                  userCourses = [];
                global.SetCurrentUser(new global.User(user.uid, userData["username"], userData["GPA"], userCourses, userData["degree"], userData["currentYearAndSem"]));
                sessionStorage.setItem("currUser",  JSON.stringify(global.currUser));
                global.SetAllCourses(global.allCourses);
                sessionStorage.setItem("allCourses",  JSON.stringify(global.allCourses));
                 //IS Cores
                 global.CreateNewCourse(new global.Course("IS111", "Intro to programming", "IS,SE,C&L", "Y1S1_IS,Y1S1_SE,Y1S1_C&L", "In this course students acquire foundational computer programming concepts and skills through Python, a widely-used programming language. Upon successful completion of this course, the students will understand and be able to appropriately apply fundamental programming concepts including variables, functions, parameters, loops and conditions as well as basic data structures including arrays (lists in Python) and hash tables (dictionaries in Python) in simple applications."));
                 global.CreateNewCourse(new global.Course("IS112", "Data Mangement", "IS,CS,SE,C&L", "Y1S2_IS,Y1S2_CS,Y1S2_SE,Y1S2_C&L", "This course will cover the fundamentals of relational database theory, important data management concepts such as data modelling, database design, database implementation and search in unstructured data (i.e., text) in current business information systems. <br><br> A series of in-class exercises, tests, quizzes and course project will help students understand covered topics. Students are expected to apply knowledge learned in the classroom to solve many problems based on real-life business scenarios, while gaining hands-on experience in designing, implementing, and managing database systems."));
                 global.CreateNewCourse(new global.Course("IS113", "Web Application Development 1", "IS,SE,C&L", "Y1S2_IS,Y1S2_SE,Y1S2_C&L", "Web applications are commonly used today by governments, enterprises, and even individuals to provide information, market products, etc. Ability to create web applications is thus a crucial skill for graduates in Information Systems. This course is designed to equip students with the knowledge and skill to develop well-styled database-driven web applications.In the early weeks of the course, students would be introduced to web concepts and trained to build static web pages using HTML. Subsequently, students will be taught on how to program dynamic web applications using PHP. Programming concepts that students have learned in prior programming courses will be revisited (using PHP as the programming language), expanded, and used to allow students to program web applications that can adapt based on user inputs. After basic PHP programming has been introduced, students will then be taught on how they can connect to a database to store, retrieve, modify, and delete data. They can then design dynamic web pages that present different contents reflecting contents stored in a database as well as allow users to modify database contents through the web pages. In the final weeks of the course, students will be introduced to more advanced PHP concepts including session management to allow for stateful interactive information exchange between users and a web application."));
                 global.CreateNewCourse(new global.Course("IS114", "Computing Fundamentals", "IS", "Y1S1", "We begin our adventure by exploring the essential elements of Computing Systems — hardware, software, and network technologies — through a series of challenging yet fun learning activities. We grow our coding skills by building a networked, distributed computing system: starting with physical computing devices that unite the cyber and physical realms, we add fundamental networking capabilities for devices to exchange information and form networks, and finally integrate the system into the cloud." ));
                 global.CreateNewCourse(new global.Course("IS216", "Web Application Development II", "IS,SE", "Y2S1_IS,Y2S1_SE", "This course is designed to equip students with knowledge and skills to develop well-styled and responsive web applications that provide rich user experiences. Combining with the skills learnt in IS113 course, which focuses on developing database-driven web applications with basic web designs, after this course, the students will be equipped with full stack web development skills, who can build both front-end and back-end software. In the introductory weeks of the course, the students will revisit HTML and server-side programming (PHP) concepts learnt in IS113. Then, the students will learn the concept of “Styling” the web pages. The students will learn a style sheet language called cascading style sheets (CSS) and learn how to separate the content and presentation of web pages, how to control web page layout, colors and fonts, how to bring multiple styles into a web page, how to control the layout of multiple web pages efficiently, etc. Next, the students will learn the concept of adding responsive behaviors to web pages to enhance the user experience. The students will learn a client-side programming language called JavaScript to make ordinary web elements like input boxes, buttons, forms, tables, menus interactive and animated. Furthermore, they will learn how to connect to API gateways and process data from external sources like RESTful web services so that they can build practical applications. In the latter weeks of the course, the students will be introduced to programming with frameworks. The students will learn how to use frameworks to build complex web applications in an efficient, scalable manner. More specifically, the students will be introduced to Bootstrap, a popular CSS framework for developing responsive website and introduced to Vue, a progressive JavaScript framework for building rich user interfaces."));
                 global.CreateNewCourse(new global.Course("IS210", "Business Process Analysis and Solutioning", "IS,C&L", "Y2S1_IS,Y2S1_C&L", "In any organization, a business process is a key asset which is a collection of related, structured activities or tasks that produce a specific service or product (serve a particular goal) for a particular customer or customers. The business objective of an organization is often to increase process speed or reduce cycle time; to increase quality; or to reduce costs, such as labour, materials, scrap, or capital costs. In other words, a management decision to invest in business process modeling is often motivated by the need to improve the efficiency and effectiveness of the processes that exist within and across organizations. Business process innovation has become a growing interest of several sectors due to the exponential growth of new technologies such as social media, big data, analytics, machine learning, IoTs and artificial intelligence. The students will be exposed to the various technologies and there role in process innovation. They will be able to analyse and review the innovated the business processes by studying some industry cases of digital transformation."));
                 global.CreateNewCourse(new global.Course("IS211", "Interaction Design And Prototyping", "IS,CS,C&L", "Y2S1_IS,Y1S1_CS,Y2S1_C&L" ,"Information systems are by necessity highly structured and predictable. Human life, on the other hand, is messy and unpredictable. When we try to fit human life into the structures expected by information systems, problems are inevitable. Interaction Design is a collection of tools for tackling these problems. When applied well, these tools can help you to build information systems that are useful, usable, and a pleasure to use. Interaction design is an iterative process. Each iteration has three stages: 1. Observation: We watch what users do to determine their needs. Watching is essential, because users often do not know or cannot express what they need. 2. Prototyping: We collect our design ideas into representations that users can interact with. Prototypes vary from very rough (low-fidelity) to more polished (high-fidelity). 3. Evaluation: We learn how well our design is meeting users' needs. There are many evaluation strategies that vary by accuracy and cost of execution. Because this is an iterative process, we do not seek a perfect solution. Instead, we focus early iterations on the most important problems, building inexpensive prototypes, and conducting fast evaluations. In later iterations, we use methods that take more effort to apply, but give more robust results. This course will teach you how to lead a professional interaction design project. You and your project group will learn the interaction design process as you design an application of your own choosing. The project is divided into two “iterations,” due in weeks 6, and 13. You will present the deliverables for each iteration of your prototype to the instructors. The first hour of each class session will be devoted to “studio,” where you will have the opportunity to discuss your project with your peers and the teaching staff. The last two hours of each class session will be devoted to lectures and exercises that introduce tools and design concepts that you will apply in your project. Your understanding of these tools and concepts will be assessed in an exam at the end of the semester."));
                 global.CreateNewCourse(new global.Course("IS213", "Enterprise Solution Development", "IS,SE", "Y2S2_IS,Y2S2_SE", "With the emergence of new technologies and evolution of existing ones, organizations are changing the way they build enterprise solutions. Rather than build monolithic applications, the current emphasis is on building solutions by leveraging existing functionality exposed as services. This approach to composing solutions using services follows the Service Oriented Architecture (SOA) paradigm, where applications are structured as a collection of loosely coupled services. In this course students will learn how to design and implement enterprise solutions using SOA using suitable tools. The course will cover topics such as service-oriented architecture (SOA), microservices architecture (MSA), web services, inter-process communication, data interchange formats, containerization, Enterprise Service Bus (ESB), and API gateways."));
                 global.CreateNewCourse(new global.Course("IS214", "Enterprise Solution Management", "IS,SE", "Y2S2_IS,Y2S2_SE", "This course explores the elements in the IT ecosystem that are required to support enterprise solutions. It is divided into three main areas: operations, recovery and change. Using common tools in the industry for ticketing, monitoring and DevOps, students are given hands-on experience as well as the understanding for robust delivery, efficient change and system resilience. Teams will be given their own system environment to maintain and monitor. Real world use cases and examples are given to highlight the importance and complexity of managing applications in the corporate enterprise. The course is spilt into the following sections: IT Operations Management, Incident prevention & recovery, Change Management."));
                 global.CreateNewCourse(new global.Course("IS215", "Digital Business - Technologies and Transformation", "IS,C&L", "Y2S2_IS,Y2S2_C&L", "This course introduces students to the fundamentals of digital business, technologies and the principles and practices that lead to successful digital transformation. With the exploitation of digital technologies such as artificial intelligence, cloud, analytics, mobile networks, social media, and the Internet of Things, organisations can develop a competitive edge that can boost efficiency and drive new business models that lead to an increase in the top and bottom lines. The course focuses on digital strategies using four components namely reimagining the business, re-evaluating value chain, reconnecting with customers and rebuilding the organisation. Challenges such as data security and governance, regulatory constraints, and future directions of digital business will be discussed. Besides helping students to understand the key concepts, tools and API services are introduced to implement the digital and analytics solutions. Real world examples and case studies of how organisations innovate and drive digital transformation will also be covered."));
                 global.CreateNewCourse(new global.Course("IS212", "Software Project Management", "IS", "Y2S2", "In IS212 (Software Project Management), students will learn about modern frameworks and tools for software project management. In particular, students will gain hands-on experience with 'scrum' and several agile techniques (e.g. test-driven development, AI-based pair programming, continuous integration) as they design and build the first release of a software system. Students will gain an appreciation for how these methods help to manage the inherent uncertainty of software projects, as well as how they ensure that developers work towards a common goal at a sustainable pace.")); 
                 // !!!!! what is project experience???
                 // global.CreateNewCourse(new global.Course(""));
 
                 //CS 
                 global.CreateNewCourse(new global.Course("CS101", "Programming Fundamentals I", "CS", "Y1S1", "This course introduces students to computational concepts and basic programming.  Students will learn the basic programming constructs, and programming techniques to solve problems. An imperative language called C is used as the vehicle of exploration. There is an emphasis on producing clear, robust, and reasonably efficient code using top-down design, and effective testing and debugging."));
                 global.CreateNewCourse(new global.Course("CS104", "Mathematical Foundations of Computing", "CS", "Y1S1", "This course serves as an introduction to the theory of discrete mathematics, which lays the foundation for computer science courses such as data structures, algorithms, relational database theory and cryptography. The topics covered in this course are mathematical logic, elementary number theory, recursion, set theory, functions, combinatorics and graphs. The course will consist of lectures and tutorials to help students understand the covered topics. "));
                 global.CreateNewCourse(new global.Course("CS102", "Programming Fundamentals II", "CS,SE", "Y1S2_CS,Y2S1_SE", "This course focuses on fundamental concepts of developing programs using an object oriented approach. There will be an emphasis on writing clean and efficient code, and the ability to use an appropriate data structure or algorithm to solve problems. The Java programming language will be taught in depth."));
                 global.CreateNewCourse(new global.Course("CS105", "Statistical Thinking for Data Science", "CS,C&L", "Y1S2_CS,Y2S2_C&L", "This is a first course in probability and statistics. It will teach fundamental concepts and techniques, and demonstrate their relevance to computer science and related disciplines particularly to data science, machine learning and artificial intelligence. In particular, some topics such as Bayesian inference, is crucial to AI-related courses (CS420, CS421, CS422, CS424, CS425). Thus, the course will require not only the understanding and development of some theoretical results with mathematical rigour, but also hands-on programming skills for practical applications. Knowledge in basic calculus is required. Some concepts in discrete mathematics (CS104) are useful, such as counting, sets and functions. While the course will use Python and its packages to illustrate and practice class work, prior knowledge of Python is not required. However, previous experience in any programming language such as C/C++ and Java is expected.  Good programming etiquettes such as code readability, reusability, efficiency and reproducibility are also expected at a level adequate for most computer science courses."));
                 global.CreateNewCourse(new global.Course("CS106", "Computer Hardware and Embedded Systems", "CS", "Y1S2", "CS106 is an introductory course in computer architecture. It aims to develop an understanding of the hardware environment upon which computing is based, and the interface it provides to higher software layers. The course also introduces basic architectures and hardware-software interfaces of computer systems. Students will understand a computer system's functional components, their characteristics, and interactions."));
                 global.CreateNewCourse(new global.Course("CS203", "Collaborative Software Development", "CS,SE", "Y2S1_CS,Y3S1_SE", "This course exposes students to software construction, software design issues, and agile processes. The focus is more on engineering working software which can be demonstrated to stakeholders frequently. The course allows students to experience agile software development and project management by working in a team to develop a HTTP based application."));
                 global.CreateNewCourse(new global.Course("CS201", "Data Structures and Algorithms", "CS", "Y2S1", "This course builds on students' earlier programming experiences, moving beyond syntax and logic, to the question of how to build “better” programs focusing on organizing data and designing algorithms for efficiency. The materials as well as the assignments rely heavily on proficiency with Java programming language. Students will learn: the concept of efficiency, why it is important for programs to be efficient and scalable, how to manage the trade-offs of computational time as well as resources such as memory, and how to compare the efficiency of various algorithms, problem-solving through judicious organization of data, how abstract data types allow encapsulation and localization, as well as how their concrete implementations in the form of various data structures allow for efficient access and modification of data. This course is different from Computational Thinking, as it goes into the theoretical underpinnings of efficiency, covers more data structures, and delves deeply into the implementations of those data structures."));
                 global.CreateNewCourse(new global.Course("CS103", "Linear Algebra for Computing Applications", "CS", "Y2S1", "CS103 is an introductory course in Linear Algebra. It teaches the mathematical foundations of Linear Algebra so as to illustrate their relevance to computer science and applications. It prepares the students for advanced numerical methods in computing, especially in machine learning and data analytics. CS103 will run in the flipped classroom model. As part of the pre-class preparation, videos and lecture notes will be released about a week before the class. Students will be expected to come fully prepared, after having learned the material, which will appear as 'Required Reading' on eLearn. Linear Algebra is a difficult field of mathematics for undergraduate students. It will call for diligence and perseverance on the part of the students. It may require you to spend perhaps an unfair share of your time on it. But the rewards are worth it, because the insights and applications of Linear Algebra encompass a large part of computer science, especially in machine learning and artificial intelligence."));
                 global.CreateNewCourse(new global.Course("CS204", "Interconnection of Cyber-Physical Systems", "CS", "Y2S1", "This course prepares students to design, deploy, and manage the interconnection of networking devices, including cyber-physical systems. It covers fundamental computer communication concepts, including switching, signalling, encoding and transmission, modern network technology, protocols (TCP, UDP, IP), and wireless (cellular and wireless LAN). Besides helping students to understand the key technologies conceptually, the course is structured to develop students' skills in building, analyzing, and evaluation simple communication networks."));
                 global.CreateNewCourse(new global.Course("CS202", "Design and Analysis of Algorithms", "CS", "Y2S2", "This course teaches students how to solve problems by designing efficient algorithms, and how to analyze the efficiency of algorithms. Students' earlier programming experiences, mathematics (discrete maths and linear algebra), and the mastery of data structures are necessary for this course.  The materials as well as the assignments expect students to have proficient programming skills in Python. Students will learn: The different paradigms of algorithm design such as divide and conquer, dynamic programming and greedy algorithms. The analysis on the complexity of algorithms. Limits of algorithm design via the study of intractability including the reductions of given problems to known problems and the knowledge of NP completeness and NP hardness. More modern algorithm design concepts such as approximation to achieve more effective problem solving and more efficient solutions. This course will go into the theoretical underpinnings of efficiency, algorithm correctness, and how algorithm design has a basis in identifying mathematical properties of the problem."));
                 global.CreateNewCourse(new global.Course("CS205", "Operating System Concepts with Android", "CS", "Y2S2", "This course aims to introduce the concepts, design principles and architectures of modern operating systems. The topics will focus on the management of computing resources, including process, memory, storage and file system. Various algorithms for resource scheduling, synchronization, caching and failure recovery will be discussed. The Android operating system will be used as the platform for system programming."));
                 global.CreateNewCourse(new global.Course("CS206", "Software Product Management", "CS,C&L" , "Y2S2_CS,Y3S1_C&L", "This course introduces students to the core concepts and skills underlying successful software product management. Students will learn about the distinct characteristics of software products vis-à-vis other industrial artefacts, and how these characteristics can be leveraged in managing the software product life cycle. With an emphasis on the elements of the software product management framework, students will acquire hands-on product management skills through classroom instruction, term projects, and presentations."));
                 global.CreateNewCourse(new global.Course("CS301", "IT Solution Architecture", "CS,SE", "Y3S1_CS,Y2S2_SE", "The IT Solution Architecture course integrates design concepts and methods to develop IT solutions from both the software and system-level perspectives.  It focuses on the analysis, design and implementation of an IT solution through which business requirements, software qualities and solution elements are transformed into implementable artefacts.  By combining critical analysis with hands-on design and development, the course prepares students to participate effectively in the architecture design and development stages of a software-intensive IT solution project. It is highly recommended that students are also proficient in IS442 Object Oriented Programming and Java programming language prior to reading this course. Students are also strongly encouraged to revise basic networking concepts (e.g., IP, DNS, DHCP, routing etc) for this course. This course will be conducted as an SMU-X course. Unless there are unforeseen circumstances (e.g., no partner is secured), an industry partner will be involved to provide project requirements for the teams."));
                 global.CreateNewCourse(new global.Course("CS302", "IT Solution Lifecycle Management", "CS", "Y3S1", "Historically, the software development process was linear and code was deployed infrequently. Today, it couldn't be more different: companies like Amazon reportedly deploy new code every 11.7 seconds, and software development culture in general has shifted towards iterating with agility. In IT Solution Lifecycle Management, students will be introduced to some state-of-the-art practices for building, testing, deploying, and maintaining software, in a way that supports frequent and rapid iterations. In particular, they will study the 'DevOps' approach, which embodies the idea that development and operation teams should work closely together throughout the entire software lifecycle. As well as studying examples of this culture through some real-world case studies, students will also gain hands-on experience, by learning how to build loosely coupled systems based on microservices, and automating the process of testing, containerising, and orchestrating them using a modern continuous integration / continuous deployment (CI/CD) pipeline."));
 
                 //SE Core
                 global.CreateNewCourse(new global.Course("SE101", "Operating Systems & Networking", "SE", "Y1S1", "This is a hybrid course that aims to equip students with foundational knowledge on operating systems and computer networking. Operating systems: knowledge of the mainstream operating systems, Microsoft Windows and Linux, security and access control strategies, shell commands and scripting, as well as enterprise-level features of various OSes. Students should be able to demonstrate ability to compare and contrast these two OSes. Students should also be comfortable with using the command line interface, including skills to troubleshoot issues pertaining to environment variables and misbehaving applications. Students should also get experience with installing Windows and Linux from scratch either on a real laptop/PC or a virtual machine. Networking: foundational networking concepts useful for programming, including TCP/IP concepts, ports, routing concepts, basic network-related security issues. Students are expected to work on real switches and routers as well as set up a simple LAN, configure the network settings for Windows, Linux, and optionally MacOS machines, to join this network, and perform basic network-related troubleshooting. Students should also be able to appreciate how the Internet works, including knowledge on DNS, gateways, the client/server architecture of Web servers and how a packet is routed from origin to destination. Students should also be able to write simple high-level programs in Python that communicate across the network. This course is specially designed to be industry-focused with hands-on practice."));
                 // CS44O Is CS core but only SE students take as core module
                 global.CreateNewCourse(new global.Course("CS440", "Foundations of Cybersecurity", "SE", "Y2S1_SE", "The Foundations of Cybersecurity course provides fundamental knowledge and technical skills for protecting computing and networking systems against various cyber-attacks. Topics covered include cryptographic algorithms, public key infrastructure, network security, authentication, access control, web security basics, and malware basics.  Classroom instructions will be integrated with hands-on exercises and group projects."));
                 global.CreateNewCourse(new global.Course("SE301", "Advanced Programming & Design", "SE", "Y3S1", "APD is a major-core course for students majoring in Software Engineering (SE). Other SCIS (non-SE) students who are interested in a career as a software developer may take this course as a free elective. This course is offered only in term 1. Since APD is designed to be taken by year 3 or 4 students training to be software developers, a lot of self-study is expected. Students are expected to work on external resources (primarily videos and selected online courses) that will be provided as mandatory class preparatory work. Some of these external content - which may not be discussed in class - are examinable."));
                 // !!!!! 6CU Apprenticeship
                 // global.CreateNewCourse(new global.Course("SE401", "Software Engineering Apprenticeship", "SE", "Y3S3", "The Software Engineering (SE) Apprenticeship is a mandatory 52-week work attachment programme.  During the apprenticeship, students will be working full-time at the sponsoring company in a suitable software-engineering role.  Students will have the opportunity to apply skills they learn from the SE Work-Study Degree programme.  The focus of the apprenticeship is to provide on-job-training for students, as well as exposure to working culture and professional practices.  The apprenticeship will be closely monitored by the school and formally assessed by SCIS's practicum manager and sponsoring companies' mentor(s). The apprenticeship can be completed in a single block or up to 2 blocks (ranging between 10 - 52 weeks each). It is possible to perform the two blocks at the same or different sponsoring companies. The SE Apprenticeship is a pass / fail course and withdrawal from course is not allowed."));
                 
 
                 //LAW Core
                 global.CreateNewCourse(new global.Course("LAW101", "Contract Law 1", "C&L", "Y1S1", "Contracts are the foundation of commercial life.  This course aims to equip students with a firm appreciation of the unique character of contracts as a form of voluntary undertakings. This course begins by examining the concepts relating to the formation of contract, as well as how an otherwise validly formed contract may have its effect nullified by issues such as misrepresentation, duress, undue influence, etc. Contract Law 1 will be followed in the second semester by LAW102 Contract Law 2 which will go on to look at issues relating to how a contract may be discharged, what sort of remedies are available when a contractual obligation is breached, as well as certain issues relating to contracts for the sale of goods. Over the two courses, the student will be sensitized to the role of the law in facilitating commerce, respecting legitimate expectations, and guarding against unfair exploitation of economic or social weakness. The study of the subject will also provide students with an excellent opportunity to observe, evaluate and critique developments in the law as it responds to the fast-changing and dynamic environment of the world of commerce."));
                 // 0.75CU For LGST102
                 global.CreateNewCourse(new global.Course("LGST102", "The Singapore Legal System and Legal Analysis Skills", "C&L", "Y1S1", "Law is a tool for problem-solving. This course examines the underlying problems that law is meant to solve, and how existing legal structures are a response to these problems.The focus is on principles of law and their application.After taking this course, students should have: 1. A working understanding of the Singapore legal system, including a.Constitutional structure, including separation of powers; b.The common law system, and the relationship between legislation and case law; c.Hierarchy of courts, and the doctrine of stare decisis; d.The division between criminal and civil law, and the role each type of law plays in society; e. The role of Organs of State (e.g. The Attorney-General's Chambers) in making, administering, and enforcing the law; and f.Practical implications of the legal system, on both lawyers and non-lawyers. 2. Competence in basic legal skills, including: a. Understanding how legal analysis is conducted; b.Understanding how legal research is conducted; c.Appreciate the issues that law-adjacent disciplines can help law to resolve."));
                 global.CreateNewCourse(new global.Course("LAW102", "Contract Law 2", "C&L", "Y1S2", "This course follows on from LAW101 - CONTRACT LAW 1 in which students will have been introduced to some of the foundational topics in contract. In LAW 102 - CONTRACT LAW 2, we will complete our survey of these foundational topics, and focus on the detailed application of these rules, and how they have been statutorily modified, in relation to one particular category of contracts, namely, contracts for the sale of goods."));
                 // 1.25CU For LAW103
                 global.CreateNewCourse(new global.Course("LAW103", "Criminal Law", "C&L", "Y1S2", "This course will introduce students to the fundamental principles of criminal liability in Singapore . Criminal law will first be examined from a jurisprudential view point with a study of its aims and objectives and the purpose of crime control and punishment in society. Students will study the major offences (against the person and property) and general defences under the Penal Code and some selected statutes. Legislative provisions, judicial decisions interpreting these provisions and proposals for reform of the law, both in Singapore and elsewhere, will be closely examined. In addition, students will learn about the Singapore criminal process and how a person accused of a crime is investigated, tried in court and, if found guilty, convicted and sentenced within our criminal justice system."));
                 // 1.5CU For LAW105
                 global.CreateNewCourse(new global.Course("LAW105", "Law of Torts", "C&L", "Y2S1", "The course will examine general principles of tort law and a selected number of torts at greater depth. The goals and objectives of tort law will be examined in the context of the relationship between torts, contract and criminal law and property law. The course will emphasise the different range of interests to be protected by tort law (such as proprietary, economic and personal interests) as well as the mental element and conduct with respect to the alleged tortfeasor (intentional, recklessness, carelessness and strict liability). The significance of consequential harm and torts actionable per se will also be discussed. The course will illustrate the dynamic nature of tort law to meet changing social and economic conditions."));
                 // 1.5CU for LAW201
                 global.CreateNewCourse(new global.Course("LAW201", "Corporate Law", "C&L", "Y3S1", "Under Singapore law, there are different ways in which businesspeople may organise commercial activities with a view to maximising operational efficiency and minimising exposure to personal risk. Most, however, will opt to incorporate a company for the purpose. This is however no indication that the company is a simple structure. On the contrary, as the company is effectively a web of different interests, rights and obligations, it is a highly complex structure. As such, the corporate form is fittingly the most regulated of all business entities. In this course, we will examine how a company is formed, the consequences of incorporation, how it is managed and controlled, what responsibilities are visited upon those who exercise control over a company's assets, how a company transacts with third parties, and how it raises capital. The course will also expose the student to issues relating to shareholder rights and to creditor protection mechanisms. In addition, the student will be introduced to corporate rescue and insolvency laws, as well as to corporate finance."));
                 global.CreateNewCourse(new global.Course("LAW401", "Intellectual Property Law", "C&L", "Y2S2", "This course does not, in today's context, require a detailed and lengthy introduction. Whereas the subject was once only encountered occasionally by students, the law of intellectual property (IP) is now widely taught and studied. It is perhaps fair to say that few branches of the law have, in recent times, developed as swiftly and explosively across jurisdictions as the law of IP and its associated laws of information and communications technology and electronic commerce. This is especially evidenced in Singapore by, inter alia, the Government's push for a sound and comprehensive legal framework for the promotion and protection of IP, and by the setting up of the Intellectual Property Office of Singapore. Several amendments have also been made to Singapore's IP legislation in order to implement the country's obligations under the United States - Singapore Free Trade Agreement (which was concluded in May 2003). More recently, the Copyright Act 1987 was repealed by Parliament and replaced by the (new) Copyright Act 2021. You will in this course be introduced to the different types of IP rights and the various branches of IP law. Some of these rights include copyright, patent and trade mark rights. We will also have the opportunity to explore, in some detail, the common law actions of passing off and breach of confidence. Obviously, a course on IP extends beyond a prosaic examination of our domestic legal infrastructure and it is a subject that will also aid in understanding entrepreneurial development in information technology. The study of IP was, at one point, a somewhat esoteric specialisation. Today, IP occupies a central position in the global, knowledge-based economy and this course should therefore appeal to those who wish to equip themselves with knowledge of a burgeoning and highly relevant area of the law."));
                 global.CreateNewCourse(new global.Course("LAW486", "Privacy and Data Protection Law", "C&L", "Y3S1", "The objective of this course is to prepare students who are interested in data protection law and may have an interest in making a career in this vibrant industry. Students will first be introduced to the data economy as a concept and to the real changes to the market and to society as well as the various forms and categorisations of data and the legal aspects to these data sets. The second part of the course will then focus on privacy law and its relationship with data protection (DP) law. In this context, comparative study will be made of privacy and DP regimes of significance (esp. the EU's GDPR). Third, students will then focus their study on the Singapore Personal Data Protection Act (with reference to other relevant laws) - in particular, the data protection and do not call provisions - by looking at its history, objective, scope/application and possible future developments. Comparative study of similar concepts and processes in other jurisdictions will also be assessed in the course of the study of the Singapore PDPA. The fundamental concepts and workings of the PDPA will be examined in depth. In the fourth part of the course, students will be given a practitioners' perspective on data governance in the private sector. After completing this course, students will be able to use what they have learnt, with other preparatory materials, to obtain professional certification such as from the International Association of Privacy Professionals (IAPP) and PDPC with a view to practice in this area as a privacy counsel, privacy professional, manager and/or technologist. This will prepare students for a career in this growing field, or at least provide them with the skills and knowledge when dealing with such issues as a lawyer or legal counsel that will possibly encounter these issues at work."));
                GoToDashboard();
            
              }
              else
              {
                global.CreateNewUser(user);
                sessionStorage.setItem("allCourses",  JSON.stringify(global.allCourses));
                //showpopup
                $('#userDetailsModal').show();
                //GoToDashboard();
            
              }
            });
        }
        else
        {
           
        }
      });

          
      
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
	//window.onmousemove  = function() {myFunction()};
	
	
})


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function GoToDashboard()
{
  sleep(2000).then(() => { window.location.href = "dashboard.html"; });
  
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
    global.currUser.SetInitialValues(global.currUser.username, gpaValue, degree, year + semester)
    //alert("Details saved successfully!");

    // Close the modal after saving
    $('#userDetailsModal').hide();
    GoToDashboard();
}

// Trigger save on button click
saveDetailsBtn.addEventListener('click', saveDetails);

    

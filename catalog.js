// Example Data
const exampleData = [
    {"name": "Introduction to Programming", "codeNo": "111", "category": "IS Core", "status": "yes", "enrolled_year": "Y1"},
    {"name": "Object Oriented Programming", "codeNo": "102", "category": "CS Core", "status": "yes", "enrolled_year": "Y2"},
    {"name": "Data Mangement", "codeNo": "112", "category": "IS Core", "status": "no", "enrolled_year": null}
]

// All the options in the filter
const Categories = ["All Tracks"]

/* This document contains functions: createFilterOptions(), createModulesTable(), removeTableItems(tableModules), editModulesTable(), createRows(tableModules, [selectedOption]) */

function createFilterOptions() {
    /* This function creates the filter options*/

    // <option selected>All Tracks</option>
    //   <option value="1">...</option>
    //   <option value="2">..</option>
    var select = document.getElementById("filterOptions");
    select.innerHTML = "";

    for (let category of Categories) {
        var options = document.createElement("option");
        options.setAttribute("value", category);
        options.innerText = category;
        select.appendChild(options);
    }
}

function createModulesTable() {
    /*
        This function creates the table of modules when user pressed "Search" button, 
        also calls createFilterOptions() to create the filter
    */

    // Table example
    //   <td><input type="checkbox"></td>
    //   <td>Introduction to Programming</td>
    //   <td>111</td>
    //   <td>IS Core</td>
    //   <td>Enrolled Y1</td>
    //   <td><button type="button" class="btn btn-secondary px-3 rounded-2">View More</button></td>

    // Get Table Element
    var tableModules = document.getElementById("tableModules");

    // Resets table
    removeTableItems(tableModules)

    // Create table
    createRows(tableModules);

    // Update filter options
    for (data_item of exampleData) {
        if (Categories.indexOf(data_item["category"]) === -1) {
            Categories.push(data_item["category"])
        }
    }

    createFilterOptions()
}

function removeTableItems(tableModules) {
    /* This functions removes the items in the table if the search button has been pressed before*/

    // Get table rows
    var rows = document.getElementById("listModules");

    if (rows !== null) {
        tableModules.children[1].remove();
    }
}

function editModulesTable() {
    /* This function changes the table when there is a change in filter */

    // Get the selected option
    var selectedFilterOption = document.getElementById("filterOptions").value;

    // Get Table Element
    var tableModules = document.getElementById("tableModules");

    // Resets table
    removeTableItems(tableModules);

    createRows(tableModules, selectedFilterOption);
    
}

function createRows(tableModules, selectedOption="All Tracks") {
    /* Module that creates the rows and append to table */

    // Create Element: Table Body
    var tableBody = document.createElement("tbody");
    tableBody.setAttribute("id", "listModules");

    for (let data_item of exampleData) {
        if (data_item["category"] === selectedOption || selectedOption === "All Tracks") {
            //Create Table Row
            var row = document.createElement("tr");

            courseName = data_item["name"];
            codeNo = data_item["codeNo"];
            category = data_item["category"];
            tookCourse = data_item["status"];
            enrolledYear = data_item["enrolled_year"];
            
            // Create checkbox
            var tableDataCol = document.createElement("td");
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.value = category.split(" ")[0] + codeNo;
            tableDataCol.appendChild(checkbox);
            row.appendChild(tableDataCol);

            // Create the other columns
            var col = document.createElement("td");
            col.innerText = courseName;
            row.appendChild(col);

            var col = document.createElement("td");
            col.innerText = codeNo;
            row.appendChild(col);

            var col = document.createElement("td");
            col.innerText = category;
            row.appendChild(col);

            var col = document.createElement("td");
            // For enrolled or not, use if-else
            if (tookCourse === "yes") {
                col.innerText = "Enrolled " + enrolledYear;
                col.setAttribute("class", "text-success");
            }
            else {
                col.innerText = "Not Enrolled";
                col.setAttribute("class", "text-danger");
            }
            row.appendChild(col);

            // Create button
            var tableDataCol = document.createElement("td");
            var button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("class", "btn btn-secondary px-3 rounded-2");
            button.innerText = "View More";
            tableDataCol.appendChild(button);
            row.appendChild(tableDataCol);

            // Append column to row
            tableBody.appendChild(row);
        }

        //Append row to table
        tableModules.appendChild(tableBody);
    }
}

createFilterOptions()
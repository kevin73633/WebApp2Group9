function createModulesTable() {
    /* This function creates the table of modules when user pressed "Search" button*/

    // Table example
        // <td><input type="checkbox"></td>
        // <td>Introduction to Programming</td>
        // <td>111</td>
        // <td>IS Core</td>
        // <td>Enrolled Y1</td>
        // <td><button type="button" class="btn btn-secondary px-3 rounded-2">View More</button></td>

    // Example Data
    const exampleData = [
        {"name": "Introduction to Programming", "codeNo": "111", "category": "IS Core", "status": "yes", "enrolled_year": "Y1"},
        {"name": "Object Oriented Programming", "codeNo": "102", "category": "CS Core", "status": "yes", "enrolled_year": "Y2"},
        {"name": "Data Mangement", "codeNo": "112", "category": "IS Core", "status": "no", "enrolled_year": null}
    ]

    // Get Table Element
    var tableModules = document.getElementById("tableModules");

    // Create Element: Table Body
    var tableBody = document.createElement("tbody")

    for (let data_item of exampleData) {
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
            col.innerText = "Enrolled" + enrolledYear;
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
        button.innerText = "View More"
        tableDataCol.appendChild(button);
        row.appendChild(tableDataCol);

        // Append column to table
        tableBody.appendChild(row);
    }

    tableModules.appendChild(tableBody)
    
}
// Create Vars for JS to append from html
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    // Alert for empty field
    if(inputBox.value === ''){
        alert("You must write something!");
    }
     else {
        // Create li list element
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        //  Add a cross to the right side
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    // Make the field empty after entering some data
    inputBox.value = '';
    saveData();
}

// When clicked in container, check if clicked in LI then add checked, if clicked on SPAN - remove element
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData()
    }
     else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData()
    } 
}, false);

// Save the data and insert the saveData(); in specific places to make that part of the code execute the data save
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

// Calling the saved data when leaving the site and comming back.
function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showData();
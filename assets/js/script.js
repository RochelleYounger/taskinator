/**DOCUMENT OBJECT MODEL (DOM)**/
// console.log(window.document);
// console.dir(window.document);

/****Object representation of <button>****/
// window.document.querySelector("button");
// console.dir(btn);

/********Object targeting of textContent********/
// document.querySelector("button").textContent;

/*******Targetting Elements by ID*******/
// document.querySelector("#save-task");

/***To Create a List Element***/
// document.createElement("li");

/*Assigning Text Content To an Element*/
// taskItemEl.textContent = "hello";
// taskItemEl;

// var buttonEl = document.querySelector("#save-task");
// // console.log(buttonEl);




/**********************************CODE BEFORE THE REFACTOR START**********************************/
/* var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form");

/***First Draft of Add Task Button Functionality****
buttonEl.addEventListener("click", function() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
}); 

/*****OPTIMIIZED "ADD TASK" BUTTON FUNCTIONALITY*******
    var createTaskHandler = function() {
    event.preventDefault();
    // console.log(event);
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // console.log(taskNameInput);
    // console.dir(taskNameInput); -- useful information, displays data as JS object

    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className= "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput 
    + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    // listItemEl.textContent = taskNameInput;
    listItemEl.appendChild(taskInfoEl);
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // console.dir(listItemEl);
};

// buttonEl.addEventListener("click", createTaskHandler);
formEl.addEventListener("submit", createTaskHandler); */
/**********************************CODE BEFORE THE REFACTOR END**********************************/

/**********************************CODE AFTER THE REFACTOR START**********************************/

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function() {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className= "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name 
        + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", taskFormHandler);

/**********************************CODE AFTER THE REFACTOR END**********************************/
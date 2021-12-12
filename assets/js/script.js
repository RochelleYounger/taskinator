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

var tasksToDoEl = document.querySelector("#tasks-to-do")
var formEl = document.querySelector("#task-form");

/***First Draft of Add Task Button Functionality****
buttonEl.addEventListener("click", function() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
}); */

/*****OPTIMIIZED "ADD TASK" BUTTON FUNCTIONALITY*****/
var createTaskHandler = function() {

    event.preventDefault();

    console.log(event);

    var listItemEl = document.createElement("li");
    listItemEl.className= "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};

// buttonEl.addEventListener("click", createTaskHandler);
formEl.addEventListener("submit", createTaskHandler);
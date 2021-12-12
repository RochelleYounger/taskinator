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

/**************FORM VALIDATION CONDITIONS EXAMPLES**************
if (true) {
// this will run because true is true
  console.log("Is true true? Yes.");
}

if (false) {
// this will not run because false is not true
  console.log("Is false true? No.");
}

if (3 === 10 || "a" === "a") {
// this will run because at least one of the conditions is true
  console.log("Does 3 equal 10? No.");
  console.log("Does the letter 'a' equal the letter 'a'? Yes.");
}

if (3 === 10 && "a" === "a") {
// this will not run because both conditions have to be true to run
  console.log("Does 3 equal 10? No.");
  console.log("Does the letter 'a' equal the letter 'a'? Yes.");
} */


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

/***************************CODE AFTER THE REFACTOR START*****************************/

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var tasks = [];

var completeEditTask = function(taskName, taskType, taskId) {
    // console.log(taskName, taskType, taskId);

    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop throught the tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

var taskStatusChangeHandler = function(event) {
    // console.log(event.target);
    // console.log(event.target.getAttribute("data-task-id"));

    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // update task in tasks  array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    console.log(tasks);
};

var taskFormHandler = function() {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    };
    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");
    // console.log(isEdit);

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else { 
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };

        createTaskEl(taskDataObj);
    };
};

var createTaskEl = function(taskDataObj) {
    // console.log(taskDataObj);
    // console.log(taskDataObj.status);

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className= "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name 
        + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    // console.log(taskActionsEl);
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    // increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // create status dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);
    
    var statusChoices = ["To Do", "In Progress", "Completed"];
    // looping creation of options
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    };

    return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);

var editTask = function(taskId) {
    // console.log("editing task #" + taskId);
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    // console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    // console.log(taskType);
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // console.log(taskSelected);
    taskSelected.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];
    
    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
};

var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;
    // console.log(event.target);

    //edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    };

    // delete button was clicked
    if (event.target.matches(".delete-btn")) {
        // console.log("you clicked a delete button!");
        var taskId = event.target.getAttribute("data-task-id");
        // console.log(taskId);
        deleteTask(taskId);
    }
};

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
/***************************CODE AFTER THE REFACTOR END******************************/
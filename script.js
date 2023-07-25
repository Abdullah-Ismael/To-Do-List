// Get the main elements
const input = document.querySelector("#txt");
const tasksDiv = document.querySelector(".tasks");
const formEl = document.querySelector("form");

let arrayOfTasks = [];

if (localStorage.tasks) {
  getDataFromStorage();
  addElementToPage(arrayOfTasks);
}

document.addEventListener("click", (e) => {
  let deleteBtns = document.querySelectorAll(".btn");
  let tasks = document.querySelectorAll(".task");
  // Click on deleteBtn
  deleteBtns.forEach((btn) => {
    if (e.target == btn) {
      e.target.parentElement.remove();
      arrayOfTasks.forEach((task) => {
        if (task.id === +e.target.parentElement.dataset.id) {
          arrayOfTasks.splice(arrayOfTasks.indexOf(task), 1);
          addToStorage(arrayOfTasks);
        }
      });
    }
  });
  // Click on task
  tasks.forEach((task) => {
    if (e.target == task) {
      task.classList.add("done");
      arrayOfTasks.forEach((task) => {
        if (task.id === +e.target.dataset.id) {
          task.complete = true;
          addElementToPage(arrayOfTasks);
          addToStorage(arrayOfTasks);
        }
      });
    }
  });
});

formEl.onsubmit = function (e) {
  // Check at the input field value
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
    e.preventDefault();
  }
};

// Add task to array function
function addTaskToArray(taskTitle) {
  const task = {
    id: Date.now(),
    title: taskTitle,
    complete: false,
  };
  arrayOfTasks.push(task);
  addElementToPage(arrayOfTasks);
  addToStorage(arrayOfTasks);
}

// Add element to page function
function addElementToPage(arrayOfTasks) {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.classList = "task";
    div.appendChild(document.createTextNode(task.title));
    div.dataset.id = task.id;
    if (task.complete === true) {
      div.classList.add("done");
    }
    let deleteBtn = document.createElement("span");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList = "btn";
    div.appendChild(deleteBtn);
    tasksDiv.appendChild(div);
  });
}

// Add task to local storage function
function addToStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

// Get data from local storage function
function getDataFromStorage() {
  let data = JSON.parse(window.localStorage.tasks);
  arrayOfTasks = data;
}

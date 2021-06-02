// Define UI vars
const form = document.querySelector("form#task-form");
const taskList = document.querySelector("ul.collection");
const clearBtn = document.querySelector("a.clear-tasks");
const filter = document.querySelector("input#filter");
const taskInput = document.querySelector("input#task");
const localStorage = window.localStorage;

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage)

  // Add task event
  form.addEventListener("submit", addTask);

  // Remove task event
  taskList.addEventListener("click", removeTask);

  // Clear tasks event
  clearBtn.addEventListener("click", clearTasks);

  // Filter Tasks event
  filter.addEventListener("keyup", filterTasks)
}

// Add Task
function addTask(e) {
  e.preventDefault();

  if(taskInput.value === "") {
    alert("Add a task");
  } else {
    // Create li element
    const li = document.createElement("li");

    // Add a class
    li.className = "collection-item";

    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Add classes
    const link = document.createElement("a");
    link.className = "delete-item secondary-content"

    // Add icon html
    link.innerHTML = `<i class="fa fa-remove"></i>`;

    // Append the link to li
    li.appendChild(link);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = "";

    taskList.appendChild(li);
  }
}

// Remove Task
function removeTask(e) {
  if(e.target.classList.contains("fa-remove")) {
    if(confirm("r u sure?")) {
      const targetLi = e.target.parentElement.parentElement;
      targetLi.remove();
      removeTaskFromLocalStorage(targetLi.textContent);
    }
  }
}

// Clear Tasks
function clearTasks(e) {
  // can do this
  taskList.innerHTML = "";

  // but this one is more faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((item) => {
    if(item.textContent.toLowerCase().indexOf(text) === -1) {
      item.style.display = "none";
    } else {
      item.style.display = "block";
    }
  });
}

// Store in LS
function storeTaskInLocalStorage(task) {
  const tasksJsonStr = localStorage.getItem("tasks");

  let taskArr;

  if (tasksJsonStr === null) {
    taskArr = [];
  } else {
    taskArr = JSON.parse(tasksJsonStr);
  }

  taskArr.push(task);

  localStorage.setItem("tasks", JSON.stringify(taskArr));
}

// Load from LS
function loadTasksFromLocalStorage() {
  const tasksJsonStr = localStorage.getItem("tasks");

  if (tasksJsonStr !== null) {
    const taskArr = JSON.parse(tasksJsonStr);

    taskArr.forEach((task) => {
      // Create li element
      const li = document.createElement("li");

      // Add a class
      li.className = "collection-item";

      // Create text node and append to li
      li.appendChild(document.createTextNode(task));

      // Add classes
      const link = document.createElement("a");
      link.className = "delete-item secondary-content"

      // Add icon html
      link.innerHTML = `<i class="fa fa-remove"></i>`;

      // Append the link to li
      li.appendChild(link);

      taskList.appendChild(li);
    });
  }
}

// remove from LS
function removeTaskFromLocalStorage(taskItem) {
  const taskArr = JSON.parse(localStorage.getItem("tasks"));

  const newTaskArr = taskArr.filter((task) => {
    return task !== taskItem;
  });

  localStorage.setItem("tasks", JSON.stringify(newTaskArr));
}

// clear from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
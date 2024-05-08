// User Information
const $userForm = document.querySelector(".form");
const $userInput = document.querySelector(".main-input");
const $userSend = document.querySelector(".main-button");
const $userNameBox = document.querySelector(".user-name-box");
const $userNameView = document.querySelector(".user-name-view");
const $userName = document.querySelector(".name");
const $appAlert = document.querySelector(".app-alert");
const $notification = document.querySelector(".app-alert audio");
const $appReset = document.querySelector(".reset-box");
const $year = document.querySelector(".year");
let $userData = [];
const $addTaskInput = document.querySelector(".add-task");
const $addTaskButton = document.querySelector(".push-task");
const $taskCount = document.querySelector(".tasks-count span");
const $taskAllContainer = document.querySelector(".tasks-all-container");
let $tasksDataArray = [];
const $searchInput = document.querySelector(".search");
const $taskControlIcon = document.querySelector(".task-control-icon");
const $taskFilter = document.querySelector(".tasks-filter");
const $action_AllTasks = document.querySelector(".filter-boxs .action-1");
const $action_CompletedTasks = document.querySelector(".filter-boxs .action-2");
const $action_UnfinishedTasks = document.querySelector(
  ".filter-boxs .action-3"
);
const $action_DeleteFinishedTasks = document.querySelector(
  ".filter-boxs .action-4"
);
const $action_EndUnfinishedTasks = document.querySelector(
  ".filter-boxs .action-5"
);
const $action_returnsDoneTask = document.querySelector(
  ".filter-boxs .action-6"
);
const $action_DeleteAllTasks = document.querySelector(".filter-boxs .action-7");

// Create a function that sends data to local storage
function setDataToStorage($key, $value) {
  const dataToSTR = JSON.stringify($value);
  const pushData = window.localStorage.setItem($key, dataToSTR);
  return pushData;
}

// Create a function that fetches data from local storage
function getDataFromStorage($key) {
  let date;
  if (window.localStorage.getItem($key)) {
    date = JSON.parse(window.localStorage.getItem($key));
  }
  return date;
}

// First, stop submitting data from the form
for (let i = 0; i < document.forms.length; i++) {
  document.forms[i].addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

// Secondly, check the status of the field whether it contains data or not
$userSend.addEventListener("click", function () {
  if ($userInput.value === "") {
    showAlert();
  } else {
    userData($userInput.value);
    $userInput.value = "";
  }
});

// Stuffing the array with the data in the local storage, if any
if (getDataFromStorage("tasks")) {
  $tasksDataArray = getDataFromStorage("tasks");
  ctrateTask(getDataFromStorage("tasks"));
}

// Third, delete the active class when using the input
$userInput.addEventListener("focus", function () {
  $appAlert.classList.remove("active");
  goAlert();
});

// Function to show and hide the active class from the alert box
function showAlert() {
  $appAlert.classList.toggle("active");
  goAlert();
  notification();
}

// Error notification sound
function notification() {
  $appAlert.classList.contains("active") ? $notification.play() : null;
}

// Automatically hide the alert box after 3 seconds
let $alert;
function goAlert() {
  if ($appAlert.classList.contains("active")) {
    $alert = setTimeout(function () {
      $appAlert.classList.remove("active");
    }, 3000);
  } else {
    clearTimeout($alert);
  }
}

// user Data And send Data to storage
function userData(userName) {
  const user = new Object({
    uName: userName,
    class1: "hidden",
    class2: "user-name-view",
  });
  $userData.push(user);
  setDataToStorage("user", $userData);
  userInterFace();
}

// Show username
function userInterFace() {
  const info = getDataFromStorage("user").forEach((property) => {
    $userName.textContent = property.uName;
    $userNameBox.remove();
    $userNameView.className = property.class2;
  });
}

if (getDataFromStorage("user")) {
  userInterFace();
}

// Reset the application to the default mode
$appReset.addEventListener("click", () => {
  window.localStorage.clear();
  window.location.reload();
  for (let i = 0; i < document.forms.length; i++) {
    document.forms[i].value = "";
  }
});

// Start Craeted Tasks Go On
$addTaskButton.addEventListener("click", () => {
  if (getDataFromStorage("user") && $addTaskInput.value !== "") {
    // Run - Function set Date To array
    setDataToArray($addTaskInput.value);

    // Unpack the form content
    $addTaskInput.value = "";
  } else {
    console.log(false);
  }
});

// Set Data To Array
function setDataToArray(task_value) {
  const taskData = new Object({
    id: Date.now(),
    contnet: task_value,
    done: false,
    delete: false,
  });
  $tasksDataArray.push(taskData);
  ctrateTask($tasksDataArray);
}

// Tasks Create
function ctrateTask(allTasks) {
  // Empty the pearnt element from the old content to avoid repetition
  $taskAllContainer.innerHTML = "";
  allTasks.forEach((task) => {
    const $task_box = document.createElement("div");
    $task_box.className = "task-box";
    $task_box.setAttribute("task-id", task.id);

    // Add and remove the still class and class donefrom the task box
    task.done === false
      ? $task_box.classList.add("still")
      : task.done === true
      ? $task_box.classList.remove("still")
      : null;

    task.done === true
      ? $task_box.classList.add("done")
      : task.done === false
      ? $task_box.classList.remove("done")
      : null;

    const $task_date_box = document.createElement("div");
    $task_date_box.className = "task-date-box";
    const $date = document.createElement("span");
    $date.className = "date";
    // Timestamp when the task was created
    const date = new Date(task.id).toLocaleString();
    $date.textContent = date;
    const $task_contnet_box = document.createElement("div");
    $task_contnet_box.className = "task-content-box";
    const $task_text_box = document.createElement("div");
    $task_text_box.className = "task-text-box";
    const $text = document.createElement("p");
    $text.className = "text";
    $text.textContent = task.contnet; // input value - task contnet
    const $task_control_box = document.createElement("div");
    $task_control_box.className = "task-control-box";
    const $done_button = document.createElement("div");
    $done_button.className = "done-button";
    const $icon_done_btn = document.createElement("span");
    $icon_done_btn.className = "icon done-btn";
    $icon_done_btn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    const $delete_button = document.createElement("div");
    $delete_button.className = "delete-button";
    const $icon_delete_btn = document.createElement("span");
    $icon_delete_btn.className = "icon delete-btn";
    $icon_delete_btn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    // Append all these elements to the parent element
    $task_box.appendChild($task_date_box);
    $task_date_box.appendChild($date);
    $task_box.appendChild($task_contnet_box);
    $task_contnet_box.appendChild($task_text_box);
    $task_text_box.appendChild($text);
    $task_contnet_box.appendChild($task_control_box);
    $task_control_box.appendChild($done_button);
    $done_button.appendChild($icon_done_btn);
    $task_control_box.appendChild($delete_button);
    $delete_button.appendChild($icon_delete_btn);
    // Appending elements after they are created to the parent element
    $taskAllContainer.appendChild($task_box);
  });
  doneRun();
  deleteRun(allTasks);
  tasksCount();
  searching();
  actionAllTasks();
  actionCompletedTasks();
  actionUnfinishedTasks();
  actionDeleteFinishedTasks(allTasks);
  actionEndUnFinishedTasks();
  actionReturnsDoneTask();
  actionDeleteAllTasks();
  // Send Data To Locale Storage
  sendDataToLocalStorage(allTasks);
}

// Function - Send Data To Locale Storage
function sendDataToLocalStorage(theData) {
  setDataToStorage("tasks", theData);
}

// Create own function using the filters list
$taskControlIcon.addEventListener("click", () => {
  $taskFilter.classList.toggle("open");
});

// Create the Function for searching for the Tskat
function searching() {
  const pTaskText = document.querySelectorAll(".text");
  $searchInput.addEventListener("keyup", () => {
    pTaskText.forEach((text) => {
      if (
        text.textContent
          .toLowerCase()
          .startsWith($searchInput.value.toLowerCase())
      ) {
        text.parentElement.parentElement.parentElement.style.display = "flex";
        document.querySelector(".thinks-icon").classList.add("hidden_class");
      } else {
        text.parentElement.parentElement.parentElement.style.display = "none";
        document.querySelector(".thinks-icon").classList.remove("hidden_class");
      }
    });
  });
}

// Create the function to end the task
function doneRun() {
  const doneBTNS = document.querySelectorAll(".done-button");
  doneBTNS.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = Number(
        button.parentElement.parentElement.parentElement.getAttribute("task-id")
      );
      $tasksDataArray.forEach((task) => {
        task.id === taskId
          ? task.done == false
            ? (task.done = true)
            : (task.done = false)
          : null;
      });
      ctrateTask($tasksDataArray);
    });
  });
}

// Create the function to delete the task
function deleteRun(data) {
  const deleteBTNS = document.querySelectorAll(".delete-button");
  deleteBTNS.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = Number(
        button.parentElement.parentElement.parentElement.getAttribute("task-id")
      );
      $tasksDataArray = data.filter((task) => task.id !== taskId);
      ctrateTask($tasksDataArray);
    });
  });
}

// Create a job for the number of available tasks
function tasksCount() {
  $taskCount.textContent = $tasksDataArray.length;
}

// Start - Filter Control Section [All -Completed - Unfinished - Delete - End - Delete All]

// Unloading the box parent from the hidden class - Function
function hiddenRemove() {
  const $hiddenClass = document.querySelectorAll(".hidden");
}

// All Tasks
function actionAllTasks() {
  const $task_box = document.querySelectorAll(".task-box");
  $action_AllTasks.addEventListener("click", () => {
    $task_box.forEach((box) => {
      box.classList.remove("show");
      box.classList.remove("hidden");
    });
  });
}

// merge Completed Tasks - Function And Unfinished Tasks Function
function hiddenAndShow(parentBox, className, hidden, show) {
  return parentBox.forEach((taskDIv) => {
    if (taskDIv.classList.contains("done")) {
      parentBox.forEach((box) => {
        box.classList.remove(hidden);
        box.classList.remove(show);
      });
      parentBox.forEach((box) => {
        if (box.classList.contains(className)) {
          box.classList.add(show);
        } else {
          box.classList.add(hidden);
        }
      });
    }
  });
}

// Completed Tasks - Function
function actionCompletedTasks() {
  const $task_box = document.querySelectorAll(".task-box");
  $action_CompletedTasks.addEventListener("click", function () {
    hiddenAndShow($task_box, "done", "hidden", "show");
  });
}

// Unfinished Tasks
function actionUnfinishedTasks() {
  const $task_box = document.querySelectorAll(".task-box");
  $action_UnfinishedTasks.addEventListener("click", function () {
    hiddenAndShow($task_box, "still", "hidden", "show");
  });
}

// Delete Finished Tasks
function actionDeleteFinishedTasks(data) {
  $action_DeleteFinishedTasks.addEventListener("click", () => {
    $tasksDataArray = data.filter((task) => task.done === false);
    ctrateTask($tasksDataArray);
  });
}

// End Unfinished Tasks
function actionEndUnFinishedTasks() {
  $action_EndUnfinishedTasks.addEventListener("click", () => {
    $tasksDataArray.forEach((task) => (task.done = true));
    ctrateTask($tasksDataArray);
  });
}

// $action_returnsDoneTask
function actionReturnsDoneTask() {
  $action_returnsDoneTask.addEventListener("click", () => {
    $tasksDataArray.forEach((task) => (task.done = false));
    ctrateTask($tasksDataArray);
  });
}

// Delete All Tasks
function actionDeleteAllTasks() {
  $action_DeleteAllTasks.addEventListener("click", () => {
    $tasksDataArray = [];
    ctrateTask($tasksDataArray);
    window.localStorage.removeItem("tasks");
  });
}

// Submit current year to footer
$year.textContent = new Date().getFullYear();

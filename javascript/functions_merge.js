// Completed Tasks - Function
function actionCompletedTasks() {
  const $task_box = document.querySelectorAll(".task-box");
  $action_CompletedTasks.addEventListener("click", () => {
    $task_box.forEach((taskDIv) => {
      if (taskDIv.classList.contains("done")) {
        $task_box.forEach((box) => {
          box.classList.remove("hidden");
          box.classList.remove("show");
        });
        $task_box.forEach((box) => {
          if (box.classList.contains("done")) {
            box.classList.add("show");
          } else {
            box.classList.add("hidden");
          }
        });
      }
    });
  });
}

// Unfinished Tasks
function actionUnfinishedTasks() {
  const $task_box = document.querySelectorAll(".task-box");
  $action_UnfinishedTasks.addEventListener("click", () => {
    $task_box.forEach((taskDIv) => {
      if (taskDIv.classList.contains("done")) {
        $task_box.forEach((box) => {
          box.classList.remove("hidden");
          box.classList.remove("show");
        });
        $task_box.forEach((box) => {
          if (box.classList.contains("still")) {
            box.classList.add("show");
          } else {
            box.classList.add("hidden");
          }
        });
      }
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

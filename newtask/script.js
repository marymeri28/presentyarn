const taskInput = document.getElementById("task");
const addButton = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const error = document.getElementById("error");
const taskCounter = document.getElementById("count");

function updateCount() {
  taskCounter.textContent = taskList.children.length;
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    error.textContent = "Please enter a task";
    return;
  }
  error.textContent = "";

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;

  const completeBtn = document.createElement("button");
  completeBtn.className = "complete";
  completeBtn.textContent = "Complete";
  completeBtn.addEventListener("click", function () {
    li.classList.toggle("done");
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateCount();
  });

  li.append(span, completeBtn, deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  taskInput.focus();
  updateCount();
}

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

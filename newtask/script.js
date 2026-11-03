const taskInput = document.getElementById("task");
const dateInput = document.getElementById("date-task"); // NEW
const addButton = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const error = document.getElementById("error");
const taskCounter = document.getElementById("count");

function updateCount() {
  taskCounter.textContent = taskList.querySelectorAll(".task-item").length;
}


function formatDate(dateValue) {
  if (dateValue === "none") return "No date";
  const today = new Date().toLocaleDateString("en-CA");
  const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString("en-CA");
  if (dateValue === today) return "Today";
  if (dateValue === tomorrow) return "Tomorrow";
  return new Date(dateValue + "T00:00").toLocaleDateString("en-CA", {
    weekday: "long",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
}


function getGroupList(dateValue) {
  const key = dateValue || "none";

  const existing = taskList.querySelector(`:scope > [data-date="${key}"]`);
  if (existing) return existing.querySelector("ul");

  const group = document.createElement("li");
  group.className = "date-group";
  group.dataset.date = key;

  const header = document.createElement("h3");
  header.className = "date-header";
  header.textContent = formatDate(key);

  const ul = document.createElement("ul");
  ul.className = "group-tasks";

  group.append(header, ul);


  const groups = taskList.querySelectorAll(":scope > .date-group");
  let nextGroup = null;
  if (key !== "none") {
    for (const g of groups) {
      if (g.dataset.date === "none" || g.dataset.date > key) {
        nextGroup = g;
        break;
      }
    }
  }
  taskList.insertBefore(group, nextGroup);

  return ul;
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    error.textContent = "Please enter a task";
    return;

    const btnWrap = document.createElement("div");
    btnWrap.className = "task-buttons";
    btnWrap.append(completeBtn, deleteBtn);

    li.append(span, btnWrap);
  }
  error.textContent = "";

  const li = document.createElement("li");
  li.className = "task-item";

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;

  const completeBtn = document.createElement("button");
  completeBtn.style.backgroundColor = "skyblue";
  completeBtn.className = "complete";
  completeBtn.textContent = "Complete";
  completeBtn.addEventListener("click", function () {
    li.classList.toggle("done");
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.style.backgroundColor = "red";
  deleteBtn.className = "delete";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    const group = li.closest(".date-group");
    li.remove();
    if (!group.querySelector(".task-item")) group.remove();
    updateCount();
  });

  const btnWrap = document.createElement("div");
  btnWrap.className = "task-buttons";
  btnWrap.append(completeBtn, deleteBtn);

  li.append(span, btnWrap);


  getGroupList(dateInput.value).appendChild(li);

  taskInput.value = "";
  dateInput.value = "";
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

const heading = document.getElementById("welcome-heading");
const hour= new Date().getHours();

if (hour < 12) {
  heading.textContent = "Good Morning! What are we doing today?";
} else if (hour <18) {
  heading.textContent = "Good Afternoon! Stay focused";
}else {
  heading.textContent ="Good Evening! Wrapping up?";
}

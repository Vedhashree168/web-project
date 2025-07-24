const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const filters = document.querySelectorAll(".filter");

let tasks = [];

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  renderTasks();
}

function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    span.contentEditable = false;

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "task-buttons";

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = task.completed ? "✅" : "✔️";
    completeBtn.onclick = () => toggleComplete(index);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.onclick = () => toggleEdit(span);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.onclick = () => deleteTask(index);

    buttonContainer.append(completeBtn, editBtn, deleteBtn);
    li.append(span, buttonContainer);
    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks(getCurrentFilter());
}

function toggleEdit(span) {
  span.contentEditable = true;
  span.focus();

  span.addEventListener("blur", () => {
    const index = Array.from(document.querySelectorAll(".task-text")).indexOf(span);
    tasks[index].text = span.textContent.trim();
    renderTasks(getCurrentFilter());
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(getCurrentFilter());
}

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(f => f.classList.remove("active"));
    btn.classList.add("active");
    renderTasks(btn.dataset.filter);
  });
});

function getCurrentFilter() {
  return document.querySelector(".filter.active").dataset.filter;
}

renderTasks();
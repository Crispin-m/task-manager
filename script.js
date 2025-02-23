document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("addTaskBtn").addEventListener("click", addTask);

// Add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  // Create a new list item for the task
  const li = document.createElement("li");
  li.innerHTML = `<span onclick="toggleComplete(this)">${taskText}</span> <button onclick="removeTask(this)">X</button>`;

  // Append the task to the list
  document.getElementById("taskList").appendChild(li);
  saveTask(taskText);
  taskInput.value = "";
}

// Toggle task completion
function toggleComplete(span) {
  const li = span.parentElement;
  li.classList.toggle("completed");
}

// Remove a task
function removeTask(button) {
  const li = button.parentElement;
  const taskText = li.querySelector("span").innerText;
  
  // Optional: Confirm removal
  if (confirm(`Delete task: "${taskText}"?`)) {
    li.style.opacity = "0";
    setTimeout(() => {
      li.remove();
      deleteTask(taskText);
    }, 300);
  }
}

// Save task to localStorage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task from localStorage
function deleteTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage on page load
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `<span onclick="toggleComplete(this)">${task}</span> <button onclick="removeTask(this)">X</button>`;
    document.getElementById("taskList").appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", loadTasks);

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const category = document.getElementById("categorySelect").value;
  const task = input.value.trim();

  if (task === "") return;

  const tasks = getTasks();
  tasks.push({ id: Date.now(), text: task, category, completed: false });
  saveTasks(tasks);
  input.value = "";
  renderTasks();
}

function renderTasks() {
  const categories = ["Werk", "Persoonlijk", "VrijeTijd"]; 
  const allTasks = getTasks();

  categories.forEach(cat => {
    const list = document.querySelector(`#${cat} .task-list`);
    if (!list) return; 

    list.innerHTML = "";

    const tasks = allTasks.filter(t => t.category === cat);

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";
      li.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button onclick="toggleComplete(${task.id})">✔️</button>
          <button onclick="deleteTask(${task.id})">🗑️</button>
        </div>
      `;
      list.appendChild(li);
    });
  });
}

function toggleComplete(id) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks(tasks);
    renderTasks();
  }
}

function deleteTask(id) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
  renderTasks();
}

function loadTasks() {
  renderTasks();
}

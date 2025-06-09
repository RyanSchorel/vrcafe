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
  tasks.push({ text: task, category, completed: false });
  saveTasks(tasks);
  input.value = "";
  renderTasks();
}

function renderTasks() {
  const categories = ["Werk", "Persoonlijk", "Vrije tijd"];
  categories.forEach(cat => {
    const list = document.querySelector(`#${cat} .task-list`);
    list.innerHTML = "";
    const tasks = getTasks().filter(t => t.category === cat);
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";
      li.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button onclick="toggleComplete(${index})">✔️</button>
          <button onclick="deleteTask(${index})">🗑️</button>
        </div>
      `;
      list.appendChild(li);
    });
  });
}

function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

function loadTasks() {
  renderTasks();
}

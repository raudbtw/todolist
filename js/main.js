const form = document.getElementById("form");
const taskInput = document.getElementById("taskInput");
const tasksList = document.getElementById("tasksList");
const emptyList = document.getElementById("emptyList");
const filterOption = document.querySelector(".filter-todos");

form.addEventListener("submit", addTask);

tasksList.addEventListener("click", deleteTask);

tasksList.addEventListener("click", doneTask);
filterOption.addEventListener("change", filterTodos);

let tasks = [];
let ul;
let list;
function addTask(event) {
  event.preventDefault();
  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);
  saveToLocalStorage();

  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";
  ul = document.querySelector("#tasksList");
  list = document.createElement("li");
  list.id = `${newTask.id}`;
  list.classList.add("list-group-item");
  ul.appendChild(list);
  const span = document.createElement("span");
  span.textContent = `${newTask.text}`;
  span.classList.add(`${cssClass}`);
  list.appendChild(span);
  const div = document.createElement("div");
  div.classList.add("task-item__buttons");
  list.appendChild(div);
  const btnDone = document.createElement("button");
  btnDone.classList.add("btn-action");
  btnDone.setAttribute("data-action", "done");
  const imgDone = document.createElement("img");
  btnDone.type = "button";
  imgDone.src = "./img/tick.svg";
  imgDone.alt = "Done";
  imgDone.width = "18";
  imgDone.height = "18";
  div.appendChild(btnDone);
  btnDone.appendChild(imgDone);
  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-action");
  btnDelete.type = "button";
  btnDelete.setAttribute("data-action", "delete");
  const imgDelete = document.createElement("img");
  imgDelete.src = "./img/cross.svg";
  imgDelete.alt = "Done";
  imgDelete.width = "18";
  imgDelete.height = "18";
  btnDelete.appendChild(imgDelete);
  div.appendChild(btnDelete);

  taskInput.value = "";
  taskInput.focus();
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;

  const parentNode = event.target.closest(".list-group-item");

  const id = parentNode.id;

  const index = tasks.findIndex((task) => task.id == id);

  tasks.splice(index, 1);

  parentNode.remove();
  saveToLocalStorage();

  if (tasksList.children.length === 1) {
    emptyList.classList.remove("none");
  }
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;
  const parentNode = event.target.closest(".list-group-item");
  const id = Number(parentNode.id);
  const task = tasks.find((task) => task.id === id);
  task.done = !task.done;
  saveToLocalStorage();
  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function filterTodos(e) {
  const todos = ul.childNodes;
  todos.forEach(function (list) {
    if (list.nodeName === "LI") {
      switch (e.target.value) {
        case "all":
          list.style.display = "flex";
          break;

        case "completed":
          if (list.children[0].classList.contains("task-title--done")) {
            list.style.display = "flex";
          } else {
            list.style.display = "none";
          }
          break;

        case "uncompleted":
          if (list.children[0].classList.contains("task-title--done")) {
            list.style.display = "none";
          } else {
            list.style.display = "flex";
          }
          break;
      }
    }
  });
}

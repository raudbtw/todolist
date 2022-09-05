const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

form.addEventListener("submit", addTask);

tasksList.addEventListener("click", deleteTask);

tasksList.addEventListener("click", doneTask);

let tasks = [];

function addTask(event) {
  event.preventDefault();
  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);

  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";
  const ul = document.querySelector("#tasksList");
  const list = document.createElement("li");
  list.id = `${newTask.id}`;
  list.classList.add("list-group-item");
  list.style = "d-flex justify-content-between task-item";
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

  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;

  const parentNode = event.target.closest(".list-group-item");

  const id = parentNode.id;

  const index = tasks.findIndex((task) => task.id == id);

  tasks.splice(index, 1);

  parentNode.remove();

  if (tasksList.children.length === 1) {
    emptyList.classList.remove("none");
  }
}

function doneTask(event) {
  if (event.target.dataset.action === "done") {
    const parentNode = event.target.closest(".list-group-item");
    const taskTitle = parentNode.querySelector(".task-title");
    taskTitle.classList.toggle("task-title--done");
  }
}

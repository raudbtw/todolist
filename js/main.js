const form = document.getElementById("form");
const taskInput = document.getElementById("taskInput");
const tasksList = document.getElementById("tasksList");
const emptyList = document.getElementById("emptyList");
const filterOption = document.querySelector(".filter-todos");

//create todo tasks

const tasks = [];

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

  //add  CSS class

  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

  //create todo items

  const todoItem = document.createElement("li");
  todoItem.id = `${newTask.id}`;
  todoItem.classList.add("list-group-item");
  tasksList.appendChild(todoItem);
  const span = document.createElement("span");
  span.textContent = `${newTask.text}`;
  span.classList.add(`${cssClass}`);
  todoItem.appendChild(span);
  const div = document.createElement("div");
  div.classList.add("task-item__buttons");
  todoItem.appendChild(div);

  // создание и работа с btnDone

  const btnDone = document.createElement("button");
  btnDone.classList.add("btn-action");
  btnDone.setAttribute("data-action", "done");
  btnDone.type = "button";
  div.appendChild(btnDone);

  // создание и работа с imgDone

  const imgDone = document.createElement("img");
  imgDone.src = "./img/tick.svg";
  imgDone.alt = "Done";
  imgDone.width = "18";
  imgDone.height = "18";
  btnDone.appendChild(imgDone);

  // создание и работа с imgDelete

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
  const todos = tasksList.childNodes;
  const todoValues = Object.values(todos);
  const res = todoValues.filter(function (todoItem) {
    if (todoItem.nodeName === "LI") {
      switch (e.target.value) {
        case "all":
          todoItem.style.display = "flex";
          break;

        case "completed":
          if (todoItem.children[0].classList.contains("task-title--done")) {
            todoItem.style.display = "flex";
          } else {
            todoItem.style.display = "none";
          }
          break;

        case "uncompleted":
          if (todoItem.children[0].classList.contains("task-title--done")) {
            todoItem.style.display = "none";
          } else {
            todoItem.style.display = "flex";
          }
          break;
      }
    }
  });
}
form.addEventListener("submit", addTask);

tasksList.addEventListener("click", deleteTask);

tasksList.addEventListener("click", doneTask);

filterOption.addEventListener("change", filterTodos);

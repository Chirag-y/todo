// Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter");

// EventListener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", todoAdd);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Function
function todoAdd(event) {
  event.preventDefault();

  // Create Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create Li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);
  saveLocalTodos(todoInput.value);

  // Create Add Button
  const newDoneButton = document.createElement("button");
  newDoneButton.classList.add("done-button");
  newDoneButton.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(newDoneButton);

  // Create Add Button
  const delButton = document.createElement("button");
  delButton.classList.add("delete-button");
  delButton.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(delButton);
  todoInput.value = "";

  todoList.appendChild(todoDiv);
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "delete-button") {
    const todo = item.parentElement;
    todo.classList.add("db");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "done-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create Li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);
    // Create Add Button
    const newDoneButton = document.createElement("button");
    newDoneButton.classList.add("done-button");
    newDoneButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(newDoneButton);
    // Create Add Button
    const delButton = document.createElement("button");
    delButton.classList.add("delete-button");
    delButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(delButton);
    todoList.appendChild(todoDiv);
  });
}

let todoList = document.getElementById("todoList");
let input = document.getElementById("list");
let button = document.getElementById("add");

let todoArr = [];
window.onload = () => {
    // console.log("Loaded");
    todoArr = JSON.parse(localStorage.getItem("todoArr")) || [];
    // console.log(todoArr);
    todoArr.forEach(todo => addtodo(todo));
}

button.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText !== "") {
        todoArr.push(taskText);
        localStorage.setItem("todoArr", JSON.stringify(todoArr));
        addtodo(taskText);
        input.value = ""; 
    }
});

function addtodo(todo) {
    let todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    todoList.appendChild(todoItem);

    let para = document.createElement("p");
    para.className = "paraname"
    para.textContent = todo;
    todoItem.appendChild(para);

    let edit = document.createElement("span")
    let editText = document.createTextNode("Edit")
    edit.className = "editName"
    edit.appendChild(editText);
    todoItem.appendChild(edit);

    edit.addEventListener("click", () => {
        if (para.contentEditable == "true") {
            para.contentEditable = "false";
            edit.innerHTML = "Edit";
        } else {
            para.contentEditable = "true";
            edit.innerHTML = "Save";
            para.focus();
        }
    })

    let del = document.createElement("span");
    let deltext = document.createTextNode("\u00D7");
    del.className = "delName";
    del.appendChild(deltext);
    todoItem.appendChild(del);

    del.addEventListener("click", () => {
        todoList.removeChild(todoItem);
        remove(todo);
    });

    para.addEventListener("dblclick", () => {
        todoList.removeChild(todoItem);
        remove(todo);
    });
}

function remove(todo) {
    let val = todoArr.indexOf(todo);
    if (val > -1) {
        todoArr.splice(val, 1);
    }
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
}

const addRes = document.getElementById("list");

addRes.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addtodo(input.value);
        input.value = "";
    }
});

let title = document.getElementById("title");
let note = document.getElementById("note");
let heading = document.getElementById("heading");
let todoList = [];
let todoListHTML = "",
  checkedtodoList = "";
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let printTodo = document.getElementById("printtodo");
let checkedData = document.getElementById("checkedData");
let updateTodo = document.getElementById("update");
let submit = document.getElementById("submit");

heading.innerHTML = `WELCOME to todolist , ${currentUser.username}`;

const toSubmit = () => {
  if (title.value == "" || note.value == "") {
    alert("enter value please");
  } else {
    todoList = JSON.parse(localStorage.getItem("todoList"));
    let todo = {
      userId: currentUser.id,
      id: Date.now(),
      title: title.value,
      note: note.value,
      checked: "unchecked",
    };

    todoList.push(todo);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    title.value = "";
    note.value = "";
    showTodo();
    showcheckBox();
  }
};

const showTodo = () => {
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  let currentuserTodo = todoList.filter((e) => {
    return e.userId == currentUser.id && e.checked == "unchecked";
  });

//   currentuserTodo = currentuserTodo.filter((e) => {
//     return ;
//   });

  todoListHTML = "";
  currentuserTodo.forEach((element) => {
    todoListHTML += `
            <div id="todo">   
                <h2>title: </h2>
                <h2>${element.title}</h2>
                <label>notes: </label>
                <label>${element.note}</labe>
                <input type="checkbox" id="checkdata" ${element.checked} onchange="checkedBox(${element.id})">
                <div>
                    <button onclick="toDelete(${element.id})">delete</button>
                    <button onclick="toEdit(${element.id})">edit</button>
                </div>
            </div>
        `;
  });
  printTodo.innerHTML = todoListHTML;
  showcheckBox();
};

const checkedBox = (id) => {
  todoList = JSON.parse(localStorage.getItem("todoList"));
  let findIndex = todoList.findIndex((e) => {
    return e.id == id;
  });
  if (todoList[findIndex].checked == "unchecked") {
    todoList[findIndex].checked = "checked";
  } else {
    todoList[findIndex].checked = "unchecked";
  }
  localStorage.setItem("todoList", JSON.stringify(todoList));
  showTodo();
  showcheckBox();
};

const toDelete = (id) => {
  todoList = JSON.parse(localStorage.getItem("todoList"));
  let findIndex = todoList.findIndex((e) => {
    return e.id == id;
  });
  todoList.splice(findIndex, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  showTodo();
};

const toEdit = (id) => {
  todoList = JSON.parse(localStorage.getItem("todoList"));
  let findIndex = todoList.findIndex((e) => {
    return e.id == id;
  });

  title.value = todoList[findIndex].title;
  note.value = todoList[findIndex].note;

  submit.style.visibility = "hidden";
  updateTodo.style.visibility = "visible";

  updateTodo.onclick = function () {
    todoList[findIndex].title = title.value;
    todoList[findIndex].note = note.value;

    localStorage.setItem("todoList", JSON.stringify(todoList));
    s;
    submit.style.visibility = "visible";
    updateTodo.style.visibility = "hidden";

    title.value = "";
    note.value = "";

    showTodo();
    showcheckBox();
  };
};

const showcheckBox = () => {
  todoList = JSON.parse(localStorage.getItem("todoList"));
  let currentuserTodo = todoList.filter((e) => {
    return e.userId == currentUser.id;
  });

  currentuserTodo = currentuserTodo.filter((e) => {
    return e.checked == "checked";
  });

  checkedtodoList = "";
  currentuserTodo.forEach((element) => {
    checkedtodoList += `
            <div id="todo">
                <h2>title: </h2>
                <h2>${element.title}</h2>
                <label>notes: </label>
                <label>${element.note}</labe>
                <input type="checkbox" id="checkdata" ${element.checked} onchange="checkedBox(${element.id})">
                <button onclick="toDelete(${element.id})">delete</button>
                <button onclick="toEdit(${element.id})">edit</button>
            </div>
        `;
  });
  checkedData.innerHTML = checkedtodoList;
};

const logout = () => {
  window.location.href = "../login-page/login.html";
};

showcheckBox();
showTodo();

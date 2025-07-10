const todosBoard = document.querySelector(".board");
const projectsBoard = document.querySelector(".projectsBoard");
const add = document.querySelector(".add");
const n = document.querySelector("#todo");
const p = document.querySelector("#pro");
const d = document.querySelector("#dis");
const t = document.querySelector("#date");

let id = 0;
let todos = [];
let projects = [];
let projectNumber = [];

function projectsNames() {
    for(let item of todos) {
        if(!projects.includes(item.project)) {
            projects.push(item.project);
        }
    }
}

function projectsNumber() {
    projectNumber = [];
    for(let pro of projects) {
        let l = 0;
        for (let item of todos) {
            if(item.project == pro) {
            l++;
            }
        }
        projectNumber.push(l);
    }
}

class Todo {
    constructor(name, project, discription, date, id) {
        this.name = name;
        this.project = project;
        this.discription = discription;
        this.date = date;
        this.id = id;
    }
};

function displayTodosCards() {
    todosBoard.innerHTML = "";
    for(let item of todos) {
        card = document.createElement('div');
        card.classList.add('todo')
        todosBoard.appendChild(card);
        header = document.createElement('h3');
        header.textContent = `${item.name}`;
        project = document.createElement('div');
        project.classList.add("p");
        project.textContent = `${item.project}`
        date = document.createElement('div');
        date.classList.add("d");
        date.textContent = `${item.date}`
        card.appendChild(header);
        card.appendChild(date);
        card.appendChild(project);
        btn = document.createElement("button");
        btn.classList.add(`${item.id}`);
        card.appendChild(btn);
        btn.textContent = `Delete`;
        btn.addEventListener("click", (btn) => {
        for(let item of todos) {
            if(btn.target.className == item.id){
            todos.splice(todos.indexOf(item), 1);
            displayTodosCards();
            displayProjectsCards();
            }
        }
        });
    }
}

function displayProjectsCards() {
    projectsBoard.innerHTML = "";
    projectsNames();
    projectsNumber();
    for(let i = 0; i < projects.length; i++) {
        if(projectNumber[i] > 0) {
        card = document.createElement('div');
        card.classList.add('project');
        projectsBoard.appendChild(card);
        project = document.createElement("h6");
        project.classList.add("q");
        project.textContent = `${projects[i]}`;
        num = document.createElement("h6");
        num.classList.add("q");
        num.textContent = `${projectNumber[i]}`;
        card.appendChild(project);
        card.appendChild(num);
        }
    }
}

add.addEventListener("click", () => {
    id++;
    let name = n.value;
    let pro = p.value;
    let dis = d.value;
    let date = t.value;
    let todo = new Todo(name, pro, dis, date, id);
    todos.push(todo);
    displayTodosCards();
    displayProjectsCards();
    clean();
});

function clean() {
    n.value = ``;
    p.value = ``;
    d.value = ``;
    t.value = ``;
}

const todosBoard = document.querySelector(".board");
const projectsBoard = document.querySelector(".projectsBoard");
const add = document.querySelector(".add");
const n = document.querySelector("#todo");
const p = document.querySelector("#pro");
const d = document.querySelector("#dis");
const t = document.querySelector("#date");



let storage = JSON.parse(localStorage.getItem('storage')) || {
    id: 0,
    todos: [],
    projects: [],
    projectNumber: [],
};




function projectsNames() {
    for(let item of storage.todos) {
        if(!storage.projects.includes(item.project)) {
            storage.projects.push(item.project);
        }
    }
}

function projectsNumber() {
    storage.projectNumber = [];
    for(let pro of storage.projects) {
        let l = 0;
        for (let item of storage.todos) {
            if(item.project == pro) {
            l++;
            }
        }
        storage.projectNumber.push(l);
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
    for(let item of storage.todos) {
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
        for(let item of storage.todos) {
            if(btn.target.className == item.id){
            storage.todos.splice(storage.todos.indexOf(item), 1);
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
    for(let i = 0; i < storage.projects.length; i++) {
        if(storage.projectNumber[i] > 0) {
        card = document.createElement('div');
        card.classList.add('project');
        projectsBoard.appendChild(card);
        project = document.createElement("h6");
        project.classList.add("q");
        project.textContent = `${storage.projects[i]}`;
        num = document.createElement("h6");
        num.classList.add("q");
        num.textContent = `${storage.projectNumber[i]}`;
        card.appendChild(project);
        card.appendChild(num);
        }
    }
}

add.addEventListener("click", () => {
    storage.id++;
    let name = n.value;
    let pro = p.value;
    let dis = d.value;
    let date = t.value;
    let todo = new Todo(name, pro, dis, date, storage.id);
    storage.todos.push(todo);
    displayTodosCards();
    displayProjectsCards();
    clean();
});

function clean() {
    n.value = ``;
    p.value = ``;
    d.value = ``;
    t.value = ``;
};

window.addEventListener('beforeunload', () => {
    localStorage.setItem('storage', JSON.stringify(storage));
    });



window.addEventListener('load', () => {  
    displayTodosCards();
    displayProjectsCards();
    });

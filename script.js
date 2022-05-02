"use strict";

const form = document.forms[0]
const taskInput = form.task
const dateInput = form.date
const priorityInput = form.priorities

const addButton = document.querySelector("#add")
const cleanButton = document.querySelector("#clean")
const emptyButton = document.querySelector("#empty")
const taskUl = document.querySelector("ul")

let taskArr = []

const savedTasks = localStorage.getItem("tasks")

if(savedTasks){
  taskArr = JSON.parse(savedTasks)
}

function updateList(){

  taskUl.innerHTML = ""
  saveTasks()
  let htmlString = ""
  
  for( let i = 0; i < taskArr.length; i++){
    const {text, date, priority, done} = taskArr[i]
    const liString = `<li ${done? 'class="done"' : ""}>
        <input type="checkbox" data-index="${i}" ${done? "checked" : ""}>
        <p>${text} ${date} ${priority}</p>
      </li>`
     htmlString += liString 
  }
  taskUl.innerHTML = htmlString
}

updateList()

function saveTasks(){
  const tasksJSON = JSON.stringify(taskArr)
  localStorage.setItem("tasks", tasksJSON)
}


function addTask(){
  const text = taskInput.value
  const date = dateInput.value
  const priority = priorityInput.value
  if(text.length >= 3){
    taskArr.unshift({
      text,date,priority,
      done: false
    })

    taskInput.value = ""
    updateList()

  } else{
    alert("La tarea debe contener al menos tres caracteres")
  }

}

function toggleTaskDone(e){

  if(e.target.matches("input")){
    const checkbox = e.target
    const {index} = checkbox.dataset
    const task = taskArr[index]
    task.done = !task.done
    updateList()
  }
}

function clean(){
  const filteredArr = taskArr.filter(task => !task.done)
  taskArr = filteredArr
  updateList()
}


function empty(){
const code = prompt("Para borrar escriba la palabra 'BORRAR':")
  if(code === "BORRAR"){
  taskArr = []
  updateList()
  }
}


addButton.addEventListener("click", addTask)
cleanButton.addEventListener("click", clean)
emptyButton.addEventListener("click", empty)


taskUl.addEventListener("click", toggleTaskDone)
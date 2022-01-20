
const data = {
    'Tasks': [],
    'mode': 'all'
}
window.onload = () => {

    if (Cookies.get('data') !== undefined) {
        let Cookies_data = JSON.parse(Cookies.get("data"))
        data.Tasks = Cookies_data.Tasks
        data.mode = Cookies_data.mode
        showtasksList()
    }
}

//just create and add to global array the new task
const createNewTask = () => {
    let newTask = {
        titel: document.getElementById('title_txt').value,
        description: document.getElementById('desc_txt').value,
        isImportant: document.getElementById('impo_chk').checked,
        state: 'submitted'
    }
    if (newTask.isImportant)
       data.Tasks.unshift(newTask)

    else
       data.Tasks.push(newTask)

    Cookies.set("data", JSON.stringify(data))
    Clear()

}

//create html nodes to show Tasks in two mode : 'all tasks' and 'just Importanta'

const showtasksList = () => {
    toggleActiveClass()
    document.getElementById('taskList').innerHTML = ''
    document.getElementById('completedTask').innerHTML = ''

    //if we want to show all tasks then mode is all and we shouldn't filter array items
    //else if we want show just important tasks then mode shouldn't have 'all' value and we must filter items of array 

    for (let task in data.Tasks.filter(item => (data.mode == 'all') || item.isImportant == 1)) {

        var element = document.createElement('li')
        var parentElementId = ''

        //we have two states for a task : submitted , done
        if (data.Tasks[task].state === "submitted") {

            parentElementId = 'taskList'
            createSubmittedTask(task, element)
            createIcons(element, '#4cbb17', 'fas fa-check-circle', 'Done', `completeTask(${task})`)
            createIcons(element, 'red', 'fas fa-trash', 'Delete', `removeTask(${task})`)
            createIcons(element, '#fff700', `${(data.Tasks[task].isImportant ? 'fas' : 'far')} fa-star`, 'Important', `makeImportant(${task})`)

        }
        else if (data.Tasks[task].state === "done") {
            let lbl = document.createElement('label')
            lbl.setAttribute("style", "text-decoration:line-through;width:65%")
            lbl.innerText = data.Tasks[task].titel
            element.appendChild(lbl)
            createIcons(element, '#fff700', `${(data.Tasks[task].isImportant ? 'fas' : 'far')} fa-star`, 'Important', '')

            parentElementId = 'completedTask'
        }

        let parentElement = document.getElementById(parentElementId)
        let p = document.createElement('p')
        p.innerText = data.Tasks[task].description
        p.setAttribute("style", "padding-left:20px;font-size:small")
        element.appendChild(p)
        parentElement.appendChild(element)

    }

}

const createSubmittedTask = (taskIndex, parentElement) => {

    let newChild = document.createElement('input')
    newChild.setAttribute('type', 'checkbox')
    newChild.setAttribute('name', `task${taskIndex}`)
    newChild.setAttribute('id', `task${taskIndex}`)
    newChild.setAttribute('type', 'checkbox')
    newChild.setAttribute('onclick', `completeTask(${taskIndex})`)

    parentElement.appendChild(newChild)

    let lblCaption = document.createElement('label')
    lblCaption.setAttribute('for', `task${taskIndex}`)
    lblCaption.setAttribute('style', 'width:65%;cursor:pointer')
    lblCaption.innerText = (data.Tasks[taskIndex]).titel
    parentElement.appendChild(lblCaption)
}
const createIcons = (parent, color, className, title, onClickMethod) => {
    let icon = document.createElement('i')
    icon.setAttribute('class', `${className}`)
    icon.setAttribute('style', `color:${color};cursor:pointer;font-size:1.5rem;margin-left:20px;`)
    icon.setAttribute('data-toggle', 'tooltip')
    icon.setAttribute('title', title)
    icon.setAttribute('onclick', onClickMethod)
    parent.appendChild(icon)
}
const AddnewTask = () => {

    createNewTask()
    showtasksList()

}

//Clear entire of array or just clear the boxes
const Clear = (All = false) => {
    document.getElementById('title_txt').value = ''
    document.getElementById('desc_txt').value = ''
    document.getElementById('impo_chk').checked = false
    if (All) {
        let text = "Are You Sure Delete All Tasks?"
        if(confirm(text) == true){
            data.Tasks.length=0
            Cookies.set("data", JSON.stringify(data))
            showtasksList()
        }
      }
}

//make a task's state 'done'
const completeTask = (taskIndex) => {

    data.Tasks[taskIndex].state = 'done'
    Cookies.set("data", JSON.stringify(data))
    showtasksList()
}

const makeImportant = (taskIndex) => {
    data.Tasks[taskIndex].isImportant = 1
    let tempTask = Tasks[taskIndex]
    data.Tasks.splice(taskIndex, 1)
    data.Tasks.unshift(tempTask)
    showtasksList()
}

//delete just a specific Task 
const removeTask = (taskIndex) => {
   data.Tasks.splice(taskIndex, 1)
    showtasksList()
}
const showJustImportant = () => {

    data.mode = 'Importants'
    showtasksList()

}
const toggleActiveClass = () => {
    document.getElementById(data.mode).classList.add("active")
    let link = Array.from(document.getElementsByClassName('nav-link')).filter(item => item.id != data.mode)
    link.map(item => item.classList.remove("active"))
}
const showAlltasksList = () =>{
    data.mode = 'all'
    showtasksList()
}

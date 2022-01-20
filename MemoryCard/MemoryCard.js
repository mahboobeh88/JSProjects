const flashCards = []

window.onload = () => {
    let tempCards = []

    if (Cookies.get("flashCards") !== undefined) {
        tempCards = eval(Cookies.get("flashCards"))
        tempCards.forEach(card => {
            addNewToDrD(card)
            flashCards.push(card)
        })
    }
}
const rotation = () => {

    document.getElementById("toggleBtn").animate([
        { transform: 'rotate(270deg)' }],
        { duration: 900 })
    let direction = document.getElementById("direction").innerText

    if (direction === "Front")
        cardToggle("Back", "Subject", (Cookies.get('Selected_subject') === undefined ? '' : Cookies.get('Selected_subject')))
    else if (direction === "Back")
        cardToggle("Front", "Title", (Cookies.get('Selected_title') === undefined ? '' : Cookies.get('Selected_title')))
}
const cardToggle = (direction, lblCaption, content) => {
    document.getElementById("direction").innerHTML = direction
    document.getElementById("lbl").innerText = lblCaption
    document.getElementById("content").innerText = content
}
const checkEmpty = (input) => {
    if (input != undefined && input.trim() === "")
        return false
    return true
}
const AddNewCard = () => {
    let titelContent = document.getElementById("titel-textarea")
    let msg = []
    if (!checkEmpty(titelContent.value)) {
        msg.push(' Title ')
        titelContent.style.borderColor = "red"
    }
    let content = document.getElementById("subject-textarea")
    if (!checkEmpty(content.value)) {
        msg.push(' Subject ')
        content.style.borderColor = "red"
    }
    if (msg.length > 0)
        showMsg('Error',`Please Enter : ${msg.toString()}`)

    else {
        titelContent.style.borderColor = 'rgba(0,0,0,.125)'
        content.style.borderColor = 'rgba(0,0,0,.125)'

        if (findObject(titelContent.value) !== undefined) {
            showMsg('Error','There is The Same Card in Repository')
            return false
        }

        let newObject = {
            title: titelContent.value,
            subject: content.value
        }
        flashCards.push(newObject)
        Cookies.set("flashCards", JSON.stringify(flashCards))
        addNewToDrD(newObject)
        clearInputs()
        return true
    }

}
const createNew = () => {
   if(AddNewCard())
    showMsg("success","Added Successfully !")
    document.getElementById("createBtn").animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1.2)' },
        { transform: 'scale(1.5)' },
        { transform: 'scale(1.2)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1)' }
    ],
        {
            duration: 100
        })
        
}
const inputChanged = (event) => {

    if (event.target.style.borderColor === "red") {
        if (event.target.value.length > 0)
            event.target.style.borderColor = rgba(0, 0, 0, .125);
        else
            event.target.style.borderColor = "red"
    }


}
const addNewToDrD = (object) => {
    let parent = document.getElementById("sel2")
    let newOpt = document.createElement('option')
    newOpt.value = parent.length
    newOpt.innerText = object.title
    parent.appendChild(newOpt)
    document.getElementById("RepoCount").innerText = `Count = ${parent.length-1}`

}
const clearInputs = () => {
    document.getElementById("titel-textarea").value = ''
    document.getElementById("subject-textarea").value = ''
}
const fetchObject = (event) => {
    let select = event.target
    let selectedTitle = select.options[select.selectedIndex].text
    let obj = findObject(selectedTitle)
    if (obj === undefined)
        alert('404 ... Not Found :)')
    else {
        Cookies.set("Selected_title", obj.title)
        Cookies.set("Selected_subject", obj.subject)
        cardToggle("Back", "Subject", obj.subject.toString())
    }
}
const findObject = (titleTosearch) => {
    return flashCards.find(obj => obj.title === titleTosearch)

}
const emptyRepo = () => {
    flashCards.length = 0
    let select = document.getElementById("sel2")
    for (let i = 1; i < select.options.length; i++)
        select.remove(i)
    Cookies.remove('flashCards')
    document.getElementById("RepoCount").innerText = `Count = ${parent.length-1}`
}
const showMsg = (type, msg) => {
    let className = ''
    switch (type) {
        case 'success':
            className = " alert alert-success"
            break;
        case 'Error':
            className = "alert alert-danger"
            break;
        default:
            className = "alert alert-info"
            break;
    }
    let alertBox = document.getElementsByClassName("alert")[0]
    alertBox.innerText = msg
    alertBox.className=className
    
   }

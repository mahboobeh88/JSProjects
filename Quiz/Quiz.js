
const questions = [{ question: 'What is the name of the white ball in snooker?', a: 'Rubber band ball', b: 'Marbles', c: 'CueBall', d: 'Super Ball', correctAnswer: 'c', userAnswer: '' },
{ question: 'How many dots has a Dice?', a: '20', b: '25', c: '23', d: '21', correctAnswer: 'd', userAnswer: '' },
{ question: 'What is the average height of newborn giraffes?', a: '1m', b: '2.5m', c: '1.8m', d: '2m', correctAnswer: 'd', userAnswer: '' },
{ question: 'Which one is not primary color?', a: 'Blue', b: 'Red', c: 'White', d: 'Green', correctAnswer: 'c', userAnswer: '' },
{ question: ' 9 ** 3 equals :', a: '279', b: '81', c: '827', d: '729', correctAnswer: 'd', userAnswer: '' },
{ question: 'The name of the father and successor of which of the Achaemenid kings was the same?', a: 'Cyrus the Great', b: 'Xerxes I', c: 'Artaxerxes I', d: 'Darius II', correctAnswer: 'a', userAnswer: '' },
{ question: 'Who is the name of the inventor of the motorcycle?', a: 'Edward Butler ', b: 'Daimler Reitwagen', c: 'Bruce Lee', d: 'Jim Carry', correctAnswer: 'b', userAnswer: '' },
{ question: 'How many hearts does an octopus have?', a: '1', b: '2', c: '8', d: '3', correctAnswer: 'd', userAnswer: '' },
{ question: 'Naranjestan Ghavam Garden is in which city?', a: 'Herat', b: 'Yazd', c: 'Islamabad', d: 'Shiraz', correctAnswer: 'd', userAnswer: '' },
{ question: 'The widest ocean in the world is:', a: 'Atlantic', b: 'Indian', c: 'Pacific', d: 'Southern Ocean', correctAnswer: 'c', userAnswer: '' }]
let questions_index = -1
let selectedByUser = ''
window.onload = () => {
    
    document.querySelectorAll(".answerBox").forEach(box => {
        box.addEventListener('mousedown', e => {
            (e.target).classList.add("focus")
        })
        box.addEventListener('mouseup', e => {
            (e.target).classList.remove("focus")
        })
        box.addEventListener('click', handler = e => {
            selectAnswer(e)
        })
    })
    fetchCookie_data()
}

function* quiz() {

    while (questions_index < questions.length) {
        questions_index++
        if (questions_index < questions.length)
            showQuestion()
        yield selectedByUser
    }
}
const myQuiz = quiz()

const showQuestion = () => {

    resetClasses()
    document.getElementById("qBox").innerText = `${questions_index + 1}.  ${questions[questions_index].question}`
    document.querySelectorAll(".answerBox").forEach(box => {
        box.querySelector("span").innerText = questions[questions_index][box.id]
    })
}
const selectAnswer = (event) => {
    document.querySelectorAll(".answerBox").forEach(box => {
        box.classList.remove("selected", "correctAnswer", "falseAnswer")
    })
    event.target.classList.add("selected")
    selectedByUser = event.target.id
    disableOptions()
    setTimeout(function () {
        checkAnswer()
    }, 50)
}
const checkAnswer = () => {
    let selected = document.querySelectorAll(".selected")
    if (selected.length > 1) {
        alert("There is a Problem! Start Again Please")
        window.location.reload(true)
        return
    }
    else if (selected.length == 0) {
        alert("Please select an answer!")
        return
    }
    if (selected[0].id === questions[questions_index].correctAnswer) {
        selected[0].classList.add("correctAnswer")
    } else {
        selected[0].classList.add("falseAnswer")
        document.querySelector(`#${questions[questions_index].correctAnswer}`).classList.add("correctAnswer")
    }


}

const clickNext = (isFromCookie) => {

    if (questions_index == -1 || isFromCookie)
        fadeInOut(".testPannel", ".wellcomeBox" , isFromCookie)

    let result = myQuiz.next()
    if (result.value != '') {
        questions[questions_index - 1].userAnswer = result.value
        Cookies.set("questions" , JSON.stringify(questions))
        Cookies.set("index" ,questions_index-1)
    }

    if (questions_index == questions.length) {
        showResults()
        Cookies.remove("questions")
        Cookies.remove("index")
    }
}

const showResults = () => {
    fadeInOut("#resultPannel", ".testPannel")
    let parent = document.getElementById("resultList")
    for (q in questions)
        createResultBox(parent, Number(q))
}

const createResultBox = (parent, index) => {


    let li = document.createElement("li")
    li.classList.add("shadow", "py-3", "mt-2", "col-12", "rounded-sm")

    let p_title = document.createElement("p")
    p_title.innerText = `${index + 1}. ${questions[index].question}`

    let p_Answers = document.createElement("p")

    let _correctAnswer = questions[index].correctAnswer
    let _userSelect = questions[index].userAnswer

    let span_correct = document.createElement("span")
    let span_user = document.createElement("span")

    span_correct.classList.add("bg-info")

    if (_correctAnswer == _userSelect)
        span_user.classList.add("bg-success")
    else
        span_user.classList.add("bg-danger")

    span_correct.innerText = `Correct: ${questions[index][_correctAnswer]} `
    span_user.innerText = `Your Selection: ${questions[index][_userSelect]}`

    p_Answers.appendChild(span_correct)
    p_Answers.appendChild(span_user)

    li.appendChild(p_title)
    li.appendChild(p_Answers)

    parent.appendChild(li)

}

const fetchCookie_data = () =>{
    if (Cookies.get("questions") !== undefined && Cookies.get("index") !== undefined)
    {
        let tmp_questions = eval(Cookies.get("questions"))
        for(let i =0; i< tmp_questions.length ; i++)
            questions[i].userAnswer = tmp_questions[i].userAnswer
        questions_index = Cookies.get("index")
        clickNext(true)
    }
}
const fadeInOut = (toFadeIn, toFadeOut, fast) => {
    time = (fast ? 1 : 2000)
    document.querySelectorAll(toFadeOut).forEach(element => {
        element.classList.add("hide")
    })
    document.querySelectorAll(toFadeIn).forEach(element => {
        element.classList.add("hide")
    })
    setTimeout(function () {
        document.querySelectorAll(toFadeOut).forEach(element => {
            element.classList.remove("d-flex")
        })
        document.querySelectorAll(toFadeOut).forEach(element => {
            element.classList.add("d-none")
        })
    }, time)
    document.querySelectorAll(toFadeIn).forEach(element => {
        element.classList.remove("d-none")
    })
    setTimeout(function () {
        document.querySelectorAll(toFadeIn).forEach(element => {
            element.classList.remove("hide")
        })
        document.querySelectorAll(toFadeIn).forEach(element => {
            element.classList.add("show")
        })
    }, time)
    document.getElementById("next_btn").classList.remove("btn-success", "btn-lg")
    document.getElementById("next_btn").classList.add("btn-primary", "btn-sm")
    document.getElementById("next_btn").innerText = "Next"
}


const resetClasses = () => {
    document.querySelectorAll(".selected").forEach(box => {
        box.classList.remove("selected")
    })
    document.querySelectorAll(".correctAnswer").forEach(box => {
        box.classList.remove("correctAnswer")
    })
    document.querySelectorAll(".falseAnswer").forEach(box => {
        box.classList.remove("falseAnswer")
    })
    document.querySelectorAll(".answerBox").forEach(box => {
        box.classList.remove("disabled")
    })
}

const disableOptions = () => {
    document.querySelectorAll(".answerBox").forEach(box => {
        box.classList.add("disabled")
    })
}

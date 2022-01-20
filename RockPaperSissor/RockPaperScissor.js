const GAME_ARRAY = ["Rock", "Paper", "Scissor"]
const GAME_Numbers = {
    Scores: {
        Computer: 0,
        Player: 0,
    },
    Game_Count: 0
}
window.onload = () => {
    if ( Cookies.get("state") === 'running'){
        GAME_Numbers.Scores.Computer = Number(Cookies.get("computerScore"))
        GAME_Numbers.Scores.Player = Number(Cookies.get("playerScore"))
        GAME_Numbers.Game_Count = Number(Cookies.get("GameCount"))
        setWinner()
        setTexts()
        setImage("player", Cookies.get("player"))
        setImage("computer", Cookies.get("computer"))
    }
};

const reset = () => {
    GAME_Numbers.Scores.Computer = 0
    GAME_Numbers.Scores.Player = 0
    GAME_Numbers.Game_Count = 0
    setWinner()
    setTexts()
    setImage("player", "none")
    setImage("computer", "none")
    setCookies()
    Cookies.set("state", 'reseted')
}
const ComputerSelection = () => {
    let selectedIndex = Math.floor(Math.random() * 3)
    let result= GAME_ARRAY.at(selectedIndex)
    setImage("computer", result)
    return result
}

const playerSelection = (playerChoice) => {
    Cookies.set('state', 'running')
    setImage('player', playerChoice)
    let computerChoice = ComputerSelection()
    Scoring(playerChoice, computerChoice)
    GAME_Numbers.Game_Count += 1
    setTexts()
    setWinner()
    setCookies()
}

const Scoring = (playerChoice, computerChoice) => {
    switch (playerChoice) {
        case "Rock":
            if (computerChoice === "Paper")
                GAME_Numbers.Scores.Computer += 1
            else if (computerChoice === "Scissor")
                GAME_Numbers.Scores.Player += 1
            break;
        case "Paper":
            if (computerChoice === "Scissor")
                GAME_Numbers.Scores.Computer += 1
            else if (computerChoice === "Rock")
                GAME_Numbers.Scores.Player += 1
            break;
        case "Scissor":
            if (computerChoice === "Rock")
                GAME_Numbers.Scores.Computer += 1
            else if (computerChoice === "Paper")
                GAME_Numbers.Scores.Player += 1
            break;
    }


}
const setImage = (id, choosedElement) => {
    Cookies.set(id, choosedElement)
    let element = document.getElementById(id)
    let urlValue = "Img/rock-paper-scissors.png"
    switch (choosedElement) {
        case 'Rock':
            urlValue = "Img/rock_selected.jpg"
            break
        case 'Paper':
            urlValue = "Img/paper_selected.png"
            break
        case 'Scissor':
            urlValue = "Img/Scissors_selected.jpg"
            break
        default: "Img/rock-paper-scissors.png"

    }
    element.setAttribute("src", urlValue)
}
const setTexts = () => {
    document.getElementById("ComputerScore").innerText = "My Score :" + GAME_Numbers.Scores.Computer.toString()
    document.getElementById("PlayerScore").innerText = "Your Score : " + GAME_Numbers.Scores.Player.toString()
    document.getElementById("GameCount").innerText = "Games Played : " + GAME_Numbers.Game_Count.toString()
}
const setWinner = () => {

    let computers = [...document.getElementsByClassName("computer")]
    let players = [...document.getElementsByClassName("player")]
    if (GAME_Numbers.Scores.Computer === GAME_Numbers.Scores.Player) {
        computers.map(element => element.classList.remove("bg-success"))
        computers.map(element => element.classList.remove("bg-danger"))
        players.map(element => element.classList.remove("bg-success"))
        players.map(element => element.classList.remove("bg-danger"))
    }
    else if (GAME_Numbers.Scores.Computer > GAME_Numbers.Scores.Player) {
        computers.map(element => element.classList.add("bg-success"))
        players.map(element => element.classList.add("bg-danger"))
    }
    else if (GAME_Numbers.Scores.Computer < GAME_Numbers.Scores.Player) {
        players.map(element => element.classList.add("bg-success"))
        computers.map(element => element.classList.add("bg-danger"))
    }
}
const setCookies = () => {
    Cookies.set("computerScore", GAME_Numbers.Scores.Computer)
    Cookies.set("playerScore", GAME_Numbers.Scores.Player)
    Cookies.set("GameCount", GAME_Numbers.Game_Count)

}
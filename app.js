const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

var countback

var teams = {"team1": {"players": [], "points": 0}, "team2": {"players": [], "points": 0}, "team3": {"players": [], "points": 0}, "team4": {"players": [], "points": 0}, "team5": {"players": [], "points": 0}}

var board = [[],[],[],[],[],[],[]]


var turn = ""
var chosen = false

var time = 0


app.get("/", (req, res) => {
    console.log(req.query);
    res.send("helló")
    console.log("heyy");
})

app.get("/getAll", (req, res) => {
    let response = {}
    console.log(req.ip);
    response.teams = teams
    response.board = [["Sure", "második téma", "Génmódosítás", "negyedik téma", "ötödik téma", "hatodik téma", "hetedik téma"],[{"kérdés": "valaminagyonhosszú de tényleg, mintha igazi kérdés lenne", "status": "claimed"},{"kérdés": "Egy fajon belül adott génállományú populáció egy vagy több tagja bekerül egy másik populációba, ezzel megváltoztatva annak génállományát.	", "status": "current"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"}],[{"kérdés": "Egy fajon belül adott génállományú populáció egy vagy több tagja bekerül egy másik populációba, ezzel megváltoztatva annak génállományát.	", "status": "claimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"}],[{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"}],[{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"}],[{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"}],[{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"}]]
    response.currentTeam = turn
    if(time == 30) {
        countback = setTimeout(() => {time -= 1; console.log(time);}, 1000)
    }
    if(time <= 0 && countback != undefined) {
        countback.clearInterval()
    }
    if(chosen) {
        response.timeStamp = time
        console.log(time);
    }
    res.send(response)
})

app.put("/choosenext", (req, res) => {
    if(req.body.team == turn && !chosen) {
        chosen = true
        // console.log(parseInt(req.body.target[1]));
        // console.log(parseInt(req.body.target[3]));
        console.log(board[0][2])
        time = 30
        console.log(time);
        res.send()
    }
    else{
        res.send()
    }
    
})


app.post("/newPlayer", (req, res) => {
    teams[req.body.team].players.push(req.body.name)
    res.send()
    console.log(teams)
})



app.get("/newTurn", (req, res) => {
    chosen = false
    switch(turn) {
        case "":
            turn = "team1"
            break
        
        case "team1":
            turn = "team2"
            break
        
        case "team2":
            turn = "team3"
            break
        
        case "team3":
            turn = "team4"
            break
        
        case "team4":
            turn = "team5"
            break

        case "team5":
            turn = "team1"
            break
    }
    console.log(turn);
    res.send()
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("started on " + port))
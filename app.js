const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())



var teams = {"team1": [], "team2": [], "team3": [], "team4": [], "team5": []}

var board = [[],[],[],[],[],[],[]]












app.get("/", (req, res) => {
    console.log(req.query);
    res.send("helló")
    console.log("heyy");
})

app.get("/getAll", (req, res) => {
    console.log(req.ip);
    let response = {}
    response.teams = teams
    response.board = [["Sure", "második téma", "Génmódosítás", "negyedik téma", "ötödik téma", "hatodik téma", "hetedik téma"],[{"kérdés": "valaminagyonhosszú de tényleg, mintha igazi kérdés lenne", "status": "claimed"},{"kérdés": "Egy fajon belül adott génállományú populáció egy vagy több tagja bekerül egy másik populációba, ezzel megváltoztatva annak génállományát.	", "status": "current"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"}],[{"kérdés": "Egy fajon belül adott génállományú populáció egy vagy több tagja bekerül egy másik populációba, ezzel megváltoztatva annak génállományát.	", "status": "claimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"}],[{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"}],[{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"}],[{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"}],[{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"},{"kérdés": "valami", "status": "unclaimed"}]]
    res.send(response)
})


app.post("/newPlayer", (req, res) => {
    teams[req.body.team].push(req.body.name)
    res.send()
    console.log(teams)
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("started on " + port))
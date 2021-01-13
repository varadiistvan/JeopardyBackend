const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

var countback

var teams = {"team1": {"players": [], "points": 0}, "team2": {"players": [], "points": 0}, "team3": {"players": [], "points": 0}, "team4": {"players": [], "points": 0}, "team5": {"players": [], "points": 0}}

var board = [["Klónozás", "Őssejtek", "Génmódosítás", "Daganatok", "Sejtosztódás", "Fehérjeszintézis", "Világító sör"],
[{"kérdés": "Első klónozott állat.", "status": "unclaimed"},{"kérdés": "Teljes élő organizmus fejlődhet ki belőle.", "status": "unclaimed"},{"kérdés": "Olyan mag, amelyből terméketlen növény fejlődik ki.", "status": "unclaimed"},{"kérdés": "A rosszindulatú daganat támadása nagy energiájú sugárzással.", "status": "unclaimed"},{"kérdés": "A DNS-szál megkettőződése.", "status": "unclaimed"},{"kérdés": "A DNS egy adott szakasza, amely valamilyen öröklődő jelleg kialakulását szabja meg.", "status": "unclaimed"},{"kérdés": "Ilyen színű a világító sör.", "status": "unclaimed"}],
[{"kérdés": "Az a szervezet, amelyiket klónozni szeretnénk.", "status": "unclaimed"},{"kérdés": "Az a módszer, ami idővel felválthatná a szervátültetést.", "status": "unclaimed"},{"kérdés": "Ennek a gyümölcsnek egyik génmódosított változata véd a ráktól.", "status": "unclaimed"},{"kérdés": "Összefoglalja a rákot megelőző életmódot.", "status": "unclaimed"},{"kérdés": "A sejtciklus osztódások közötti fázisa.", "status": "unclaimed"},{"kérdés": "Erre kerül át a transzkripció során az információ.", "status": "unclaimed"},{"kérdés": "Ilyen állat génjétől világít a világító sör.", "status": "unclaimed"}],
[{"kérdés": "Embereknél természetes jelenség, amely közel áll a klónozáshoz.", "status": "unclaimed"},{"kérdés": "Elhalni készülő szöveti sejtjeink átprogramozásával létrehozott őssejt.", "status": "unclaimed"},{"kérdés": "Egy fajon belül adott génállományú populáció egy vagy több tagja bekerül egy másik populációba, ezzel megváltoztatva annak génállományát.", "status": "unclaimed"},{"kérdés": "Olyan daganat, amit egy hártya borít.", "status": "unclaimed"},{"kérdés": "Ennél a sejtosztódásnál egy (1) diploidból négy (4) haploid lesz.", "status": "unclaimed"},{"kérdés": "A genetikai információ egysége.", "status": "unclaimed"},{"kérdés": "Ennyibe kerül egy csomag világító sör.", "status": "unclaimed"}],
[{"kérdés": "Ezt az állatot szeretné a Sooam Biotech rekreálni klónozás útján.", "status": "unclaimed"},{"kérdés": "Egy módszer, amely során egy, a mai emlősökben már nem működő génbeviteli mechanizmussal újfajta fehérjék vihetők a sejtbe.", "status": "unclaimed"},{"kérdés": "Ez a vírusos betegség támadta Hawaii-n a papayákat, amiket génmódosítással mentettek meg.", "status": "unclaimed"},{"kérdés": "A kötőszövetekben kialakuló rosszindulatú daganat.", "status": "unclaimed"},{"kérdés": "A kromoszómák befűződéséhez kapcsolódó húzófonalak.", "status": "unclaimed"},{"kérdés": "A három szakasza a lánckezdés, a láncnövekedés és a lánczáródás.", "status": "unclaimed"},{"kérdés": "A világító sör alkotójának cégének a neve.", "status": "unclaimed"}],
[{"kérdés": "A nem megtermékenyített, de érett petesejt sejtmagját eltávolítjuk, és a klónozni kívánt élőlény sejtmagját ültetjük a helyébe.", "status": "unclaimed"},{"kérdés": "A tudós, aki bemutatta, hogy a szöveti sejtjeinket át lehet programozni és pluripotens embrionális jellegű őssejteket lehet létrehozni belőlük.", "status": "unclaimed"},{"kérdés": "A BT növények erről a baktériumról kapták a nevüket.", "status": "unclaimed"},{"kérdés": "A rosszindulatú daganat távoli áttéteket alakít ki a vér- vagy nyirokkeringésen keresztül", "status": "unclaimed"},{"kérdés": "A homológ kromoszómapárok kromatidái átkereszteződnek, majd ezek a szakaszok kicserélődnek.", "status": "unclaimed"},{"kérdés": "Ezen bázishármas jelentése a prolin", "status": "unclaimed"},{"kérdés": "Itt dolgozott egykor a világító sör megalkotója", "status": "unclaimed"}],
]


var turn = ""
var chosen = false

var time = 0

var buzzes = []

app.get("/", (req, res) => {
    console.log(req.query);
    res.send("helló")
    console.log("heyy");
})

app.get("/getAll", (req, res) => {
    let response = {}
    // console.log(req.ip);
    response.teams = teams
    response.board = board
    response.currentTeam = turn
    if(time == 40) {
        time -= 1
        countback = setInterval(() => {time -= 1; console.log("tick");}, 1000)
    }
    if(time <= 0 && countback != undefined) {
        clearInterval(countback)
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
        board[parseInt(req.body.target[1])+1][parseInt(req.body.target[3])].status = "current"
        time = 40
        console.log(time);
        buzzes = []
        res.send()
    }
    else{
        res.send()
    }
    
})

app.get("/getbuzzes", (req, res) => {
    let response = {}
    response.buzzes = buzzes
    res.send(response)
})

app.get("/updatePoints", (req, res) => {
    teams[req.query.team].points += parseInt(req.query.points)
    console.log(req.query);
    console.log(teams);
    res.send()
})


app.post("/newPlayer", (req, res) => {
    teams[req.body.team].players.push(req.body.name)
    res.send()
    console.log(teams)
})


app.get("/buzzedIn", (req, res) => {
    if(time != 0) {
        res.send()
    }
    else {
        buzzes.push(req.query)
        console.log(buzzes);
    }
})



app.get("/newTurn", (req, res) => {
    chosen = false
    for(i of board) {
        for(j of i) {
            if(j.status == "current") {
                j.status = "claimed"
            }
        }
    }
    time = 1
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
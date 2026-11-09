// En premier : les variables de .env doivent exister avant que les modules importés les lisent (ex. SCORES_FICHIER).
import "dotenv/config"
import { WebSocketTransport } from "@colyseus/ws-transport"
import { Server } from "@colyseus/core"
import express from "express"
import http from "http"
import path from "path"

var cors = require('cors')

import { CLASSEMENT_INITIAL, scoresServeur } from "./stockage/fichierScores"
import GameRooms from "./game/Hall_01"
import LobbyRooms from "./game/lobby"
import AcceuilRooms from "./game/acceuil"
// Get environment variables
console.log("---------PORT---------");
console.log(process.env.PORT);

const HOST = process.env.HOST || "0.0.0.0"
const PORT = parseInt(process.env.PORT || "3000")

// Instantiate Express app
const app = express()

app.use(express.json())

// Serve dist folder
const distPath = path.join(__dirname, "../../dist/")
app.use(express.static(distPath))

// app.use('/colyseus', monitor());
app.use(cors());

// Register frontend pages
app.get("/", (_request, response) => {
  response.sendFile(distPath + "/index.html")
})

// Classement hors du build (anomalie B4) : créé au premier démarrage depuis le classement versionné.
if (scoresServeur.initialiser(CLASSEMENT_INITIAL)) console.info(`Classement initialisé : ${scoresServeur.chemin}`)

app.get('/scores', (_request, res) => {
  scoresServeur.lireBrut().then((donnes) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(donnes);
  }).catch((erreur: unknown) => {
    console.error("Lecture du classement impossible :", erreur);
    res.status(500).end();
  });
})

// Pas de POST /scores : le serveur enregistre lui-même les scores en fin de partie (anomalie B3).

app.get('/:id', (_request, response) => {
  response.sendFile(distPath + "/index.html")
})

// Define game server
const server = http.createServer(app)

const gameServer = new Server({
  // Pas de bannière publicitaire au démarrage (Colyseus 0.18) : garde le journal lisible.
  greet: false,
  transport: new WebSocketTransport({
    server: server,
    pingInterval: 5000,
    pingMaxRetries: 3,
  }),
})

// Register room handlers
gameServer.define("lobby", LobbyRooms).filterBy(['salon']).enableRealtimeListing();
gameServer.define("game_instance", GameRooms).filterBy(['salon'])
gameServer.define("acceuil", AcceuilRooms);

// Start game server
void gameServer.listen(PORT, HOST)
console.info(`Listening on http://${HOST}:${PORT}`)

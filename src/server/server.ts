import { WebSocketTransport } from "@colyseus/ws-transport"
import { Server } from "colyseus"
import dotenv from "dotenv"
import express from "express"
import http from "http"
import path from "path"
import { monitor } from "@colyseus/monitor";
import * as fs from 'fs';

var cors = require('cors')

import GameRooms from "./game/Hall_01"
import LobbyRooms from "./game/lobby"
import AcceuilRooms from "./game/acceuil"
// Get environment variables
dotenv.config()
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

app.get('/scores', (_request, res) => {
  const donnes = fs.readFileSync(__dirname + '/scores.json');
  res.setHeader('Content-Type', 'application/json');
  res.end(donnes);
})

app.post('/scores', (request, res: any) => {
  const data:any = fs.readFileSync(__dirname + "/scores.json");
  const myObject = JSON.parse(data);
  const objetFinal = { ...myObject }
  objetFinal[`${request.body.equipe}`] = {
    "joueurs": request.body.joueur,
    "score": `${request.body.score}`
  }

  //tri par ordre croissant de l'objet score
  var rep = Object.entries(objetFinal).sort(function(obj1, obj2) {
    return parseInt((obj1[1] as any).score.replace(/:/g,'')) - parseInt((obj2[1] as any).score.replace(/:/g,''));
  });

  var newData2 = JSON.stringify(Object.fromEntries(rep));
  fs.writeFile(__dirname + "/scores.json", newData2, (err) => {
    if (err) throw err;
  });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({"status":"ok"}));
})

app.get('/:id', (_request, response) => {
  response.sendFile(distPath + "/index.html")
})

// Define game server
const server = http.createServer(app)

const gameServer = new Server({
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

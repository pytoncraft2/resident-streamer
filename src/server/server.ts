import { WebSocketTransport } from "@colyseus/ws-transport"
import { Server } from "colyseus"
import dotenv from "dotenv"
import express from "express"
import http from "http"
import path from "path"
import { monitor } from "@colyseus/monitor";
import * as fs from 'fs';


import GameRooms from "./game/Hall_01"
import LobbyRooms from "./game/lobby"
import AcceuilRooms from "./game/acceuil"
// Get environment variables
dotenv.config()
const HOST = process.env.HOST || "0.0.0.0"
const PORT = parseInt(process.env.PORT || "3000")

// Instantiate Express app
const app = express()

// Serve dist folder
const distPath = path.join(__dirname, "../../dist/")
app.use(express.static(distPath))

app.use('/colyseus', monitor());
// Register frontend pages
app.get("/", (_request, response) => {
  response.sendFile(distPath + "/index.html")
})

app.get('/scores', (_request, res) => {
  const donnes = fs.readFileSync('./src/server/scores.json');
  res.setHeader('Content-Type', 'application/json');
  res.end(donnes);
})

app.post('/scores', (_request, res) => {
var data:any = fs.readFileSync("./src/server/scores.json");
var myObject = JSON.parse(data);
myObject["EQUIPE JAMIE"] = {
        "joueurs": ["Jamie", "Marcel", "Jean"],
        "score": "3min"
      }
var newData2 = JSON.stringify(myObject);
fs.writeFile("./src/server/scores.json", newData2, (err) => {
  if (err) throw err;
});
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      "BATMAN":{
        "joueurs": ["Jamie", "Marcel", "Jean"],
        "score": "3min"
      },
      "SUPERMAN": {
        "joueurs": ["SOSO", "SASA", "Jean"],
        "score": "4min"
      },
      "ZORRO": {
        "joueurs": ["MDR", "LOL", "YES"],
        "score": "1min"
      }
    }));
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

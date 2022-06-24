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
  const donnes = fs.readFileSync('./src/server/scores.json');

//   let donnes: any = {
//     "pays": "Angleterre"
// }

// const nouvelleDonne = JSON.parse(donnes.toString())

// var json = JSON.parse(donnes)
// json.push('search result: test')
//
// fs.writeFile("scores.json", JSON.stringify(json));
//
// var json = JSON.parse(donnes);
// json.push("search result: " + "test");
// fs.writeFile("scores.json", JSON.stringify(json), function(err){
//   if (err) throw err;
//   console.log('The "data to append" was appended to file!');
// });

// var json = JSON.parse(donnes);
fs.appendFile("./src/server/scores.json", JSON.parse(JSON.stringify({"heyll":"h"})), function (err) {
   if (err) throw err;
   console.log('The "data to append" was appended to file!');
});
  res.setHeader('Content-Type', 'application/json');
  res.end(donnes);
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

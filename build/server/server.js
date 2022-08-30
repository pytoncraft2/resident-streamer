"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_transport_1 = require("@colyseus/ws-transport");
const colyseus_1 = require("colyseus");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const monitor_1 = require("@colyseus/monitor");
const fs = __importStar(require("fs"));
var cors = require('cors');
const Hall_01_1 = __importDefault(require("./game/Hall_01"));
const lobby_1 = __importDefault(require("./game/lobby"));
const acceuil_1 = __importDefault(require("./game/acceuil"));
// Get environment variables
dotenv_1.default.config();
const HOST = process.env.HOST || "0.0.0.0";
const PORT = parseInt(process.env.PORT || "3000");
// Instantiate Express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Serve dist folder
const distPath = path_1.default.join(__dirname, "../../dist/");
app.use(express_1.default.static(distPath));
app.use('/colyseus', (0, monitor_1.monitor)());
app.use(cors());
// Register frontend pages
app.get("/", (_request, response) => {
    response.sendFile(distPath + "/index.html");
});
app.get('/scores', (_request, res) => {
    const donnes = fs.readFileSync('./src/server/scores.json');
    res.setHeader('Content-Type', 'application/json');
    res.end(donnes);
});
app.post('/scores', (request, res) => {
    const data = fs.readFileSync("./src/server/scores.json");
    const myObject = JSON.parse(data);
    const objetFinal = Object.assign({}, myObject);
    objetFinal[`${request.body.equipe}`] = {
        "joueurs": request.body.joueur,
        "score": `${request.body.score}`
    };
    //tri par ordre croissant de l'objet score
    var rep = Object.entries(objetFinal).sort(function (obj1, obj2) {
        return parseInt(obj1[1].score.replace(/:/g, '')) - parseInt(obj2[1].score.replace(/:/g, ''));
    });
    var newData2 = JSON.stringify(Object.fromEntries(rep));
    fs.writeFile("./src/server/scores.json", newData2, (err) => {
        if (err)
            throw err;
    });
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ "status": "ok" }));
});
app.get('/:id', (_request, response) => {
    response.sendFile(distPath + "/index.html");
});
// Define game server
const server = http_1.default.createServer(app);
const gameServer = new colyseus_1.Server({
    transport: new ws_transport_1.WebSocketTransport({
        server: server,
        pingInterval: 5000,
        pingMaxRetries: 3,
    }),
});
// Register room handlers
gameServer.define("lobby", lobby_1.default).filterBy(['salon']).enableRealtimeListing();
gameServer.define("game_instance", Hall_01_1.default).filterBy(['salon']);
gameServer.define("acceuil", acceuil_1.default);
// Start game server
void gameServer.listen(PORT, HOST);
console.info(`Listening on http://${HOST}:${PORT}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUEyRDtBQUMzRCx1Q0FBaUM7QUFDakMsb0RBQTJCO0FBQzNCLHNEQUE2QjtBQUM3QixnREFBdUI7QUFDdkIsZ0RBQXVCO0FBQ3ZCLCtDQUE0QztBQUM1Qyx1Q0FBeUI7QUFFekIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBRTFCLDZEQUFzQztBQUN0Qyx5REFBcUM7QUFDckMsNkRBQXlDO0FBQ3pDLDRCQUE0QjtBQUM1QixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ2YsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFBO0FBQzFDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQTtBQUVqRCwwQkFBMEI7QUFDMUIsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUE7QUFFckIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFFdkIsb0JBQW9CO0FBQ3BCLE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFBO0FBQ3BELEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtBQUVqQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFBLGlCQUFPLEdBQUUsQ0FBQyxDQUFDO0FBQ2hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUNmLDBCQUEwQjtBQUMxQixHQUFHLENB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
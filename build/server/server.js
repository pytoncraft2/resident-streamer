"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQTJEO0FBQzNELHVDQUFpQztBQUNqQyxvREFBMkI7QUFDM0Isc0RBQTZCO0FBQzdCLGdEQUF1QjtBQUN2QixnREFBdUI7QUFDdkIsK0NBQTRDO0FBQzVDLHVDQUF5QjtBQUV6QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFFMUIsNkRBQXNDO0FBQ3RDLHlEQUFxQztBQUNyQyw2REFBeUM7QUFDekMsNEJBQTRCO0FBQzVCLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDZixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUE7QUFDMUMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFBO0FBRWpELDBCQUEwQjtBQUMxQixNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQTtBQUVyQixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUV2QixvQkFBb0I7QUFDcEIsTUFBTSxRQUFRLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUE7QUFDcEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0FBRWpDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUEsaUJBQU8sR0FBRSxDQUFDLENBQUM7QUFDaEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ2YsMEJBQTBCO0FBQzFCLEdBQUcsQ0FBQyxH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
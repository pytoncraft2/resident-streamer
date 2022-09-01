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
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
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
// app.use('/colyseus', monitor());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
// Register frontend pages
app.get("/", (_request, response) => {
    response.sendFile(distPath + "/index.html");
});
app.get('/scores', (_request, res) => {
    const donnes = fs.readFileSync(__dirname + '/scores.json');
    res.setHeader('Content-Type', 'application/json');
    res.end(donnes);
});
app.post('/scores', (request, res) => {
    const data = fs.readFileSync(__dirname + "/scores.json");
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
    fs.writeFile(__dirname + "/scores.json", newData2, (err) => {
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
const server = https_1.default.createServer({
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
}, app);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQTJEO0FBQzNELHVDQUFpQztBQUNqQyxvREFBMkI7QUFDM0Isc0RBQTZCO0FBQzdCLGtEQUF5QjtBQUN6QixnREFBdUI7QUFFdkIsdUNBQXlCO0FBRXpCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUUxQiw2REFBc0M7QUFDdEMseURBQXFDO0FBQ3JDLDZEQUF5QztBQUN6Qyw0QkFBNEI7QUFDNUIsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUNmLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQTtBQUMxQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLENBQUE7QUFFakQsMEJBQTBCO0FBQzFCLE1BQU0sR0FBRyxHQUFHLElBQUEsaUJBQU8sR0FBRSxDQUFBO0FBRXJCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBRXZCLG9CQUFvQjtBQUNwQixNQUFNLFFBQVEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQTtBQUNwRCxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7QUFFakMsbUNBQW1DO0FBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsRUFBRTtJQUNwQixHQUFHLENBQUMsTUFBTSxDQUFD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
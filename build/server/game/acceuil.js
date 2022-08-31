"use strict";
// //@ts-nocheck
/**
 * Lobby serveur
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@colyseus/schema");
const colyseus_1 = require("colyseus");
class LobbyState extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("string")
], LobbyState.prototype, "custom", void 0);
class CustomLobbyRoom extends colyseus_1.LobbyRoom {
    onCreate(options) {
        const _super = Object.create(null, {
            onCreate: { get: () => super.onCreate }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.onCreate.call(this, options);
            this.setState(new LobbyState());
        });
    }
    onJoin(client, options) {
        super.onJoin(client, options);
        this.state.custom = client.sessionId;
    }
    onLeave(client) {
        super.onLeave(client);
    }
}
exports.default = CustomLobbyRoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXVpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9hY2NldWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQkFBZ0I7QUFDaEI7O0dBRUc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUgsNkNBQWdEO0FBQ2hELHVDQUE2QztBQUU3QyxNQUFNLFVBQVcsU0FBUSxlQUFNO0NBRTlCO0FBRG1CO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDOzBDQUFpQjtBQUdwQyxNQUFxQixlQUFnQixTQUFRLG9CQUFTO0lBQzVDLFFBQVEsQ0FBQyxPQUFZOzs7OztZQUN2QixNQUFNLE9BQU0sUUFBUSxZQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTlCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBQyxNQUFjLEVBQUUsT0FBWTtRQUMvQixLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBVztRQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNKO0FBZkQsa0NBZUMifQ==
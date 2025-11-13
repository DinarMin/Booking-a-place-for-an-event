"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
const postgres_1 = __importDefault(require("../db/postgres"));
class EventRepository {
    createEvent(name, total_seats) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield postgres_1.default.query("INSERT INTO events (name, total_seats) VALUES($1, $2) RETURNING *", [name, total_seats]);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getEventById(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield postgres_1.default.query("SELECT * FROM events WHERE id = $1", [
                    event_id,
                ]);
                return result.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    decreaseSeat(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield postgres_1.default.query(`UPDATE events
          SET total_seats = total_seats - 1
          WHERE id = $1 AND total_seats > 0
          RETURNING id, total_seats
        `, [event_id]);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.EventRepository = EventRepository;

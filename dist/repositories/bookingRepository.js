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
exports.BookingRepository = void 0;
const postgres_1 = __importDefault(require("../db/postgres"));
class BookingRepository {
    // Проверка, забронировал ли юзер это событие
    findBooking(event_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield postgres_1.default.query("SELECT EXISTS (SELECT 1 FROM bookings WHERE event_id=$1 AND user_id=$2)", [event_id, user_id]);
                return result.rows[0].exists;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createBooking(event_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Создание записи о бронирование 
            try {
                const result = yield postgres_1.default.query("INSERT INTO bookings(event_id, user_id) VALUES($1, $2) RETURNING *", [event_id, user_id]);
                return result.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.BookingRepository = BookingRepository;

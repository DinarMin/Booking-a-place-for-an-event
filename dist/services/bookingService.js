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
exports.BookingService = void 0;
const postgres_1 = __importDefault(require("../db/postgres"));
class BookingService {
    constructor(eventRepo, bookingRepo) {
        this.eventRepo = eventRepo;
        this.bookingRepo = bookingRepo;
    }
    reservationSeat(event_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield postgres_1.default.connect();
            try {
                yield client.query("BEGIN");
                // Проверка наличие событие
                const isEvent = yield this.eventRepo.getEventById(event_id);
                if (!isEvent) {
                    yield client.query("ROLLBACK");
                    throw new Error("Событие не существует!");
                }
                // Проверка, забронировал ли юзер это событие
                const isReservation = yield this.bookingRepo.findBooking(event_id, user_id);
                if (isReservation) {
                    yield client.query("ROLLBACK");
                    throw new Error("Нет возможности повторно забронировать одно и то-же событие");
                }
                // Проверка и последующие изменение мест в events
                const isAvailability = yield this.eventRepo.decreaseSeat(event_id);
                if (isAvailability.rowCount === 0) {
                    yield client.query("ROLLBACK");
                    throw new Error("Свободных мест больше нет");
                }
                // Создание записи о бронирование 
                const booking = yield this.bookingRepo.createBooking(event_id, user_id);
                yield client.query("COMMIT");
                return booking;
            }
            catch (error) {
                yield client.query("ROLLBACK");
                throw error;
            }
            finally {
                client.release();
            }
        });
    }
}
exports.BookingService = BookingService;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const bookingService_1 = require("../services/bookingService");
const eventRepository_1 = require("../repositories/eventRepository");
const bookingRepository_1 = require("../repositories/bookingRepository");
const eventRepo = new eventRepository_1.EventRepository();
const bookingRepo = new bookingRepository_1.BookingRepository();
const bookingService = new bookingService_1.BookingService(eventRepo, bookingRepo);
class BookingController {
    static reserve(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { event_id, user_id } = req.body;
                if (!event_id || !user_id) {
                    res
                        .status(400)
                        .json({ error: "Обязательные поля: event_id и user_id" });
                }
                const booking = yield bookingService.reservationSeat(event_id, user_id);
                res.status(200).json(booking);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json({ message: error.message });
                }
            }
        });
    }
}
exports.BookingController = BookingController;

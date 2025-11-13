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
exports.EventController = void 0;
const eventRepository_1 = require("../repositories/eventRepository");
const eventService_1 = require("../services/eventService");
const eventRepo = new eventRepository_1.EventRepository();
const eventService = new eventService_1.EventService(eventRepo);
class EventController {
    static createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, total_seats } = req.body;
                if (!name || !total_seats) {
                    res
                        .status(400)
                        .json({ error: "Обязательные поля: name и total_seats" });
                }
                const event = yield eventService.createEvent(name, total_seats);
                res.status(200).json({ message: `Ивент: ${name} успешно создан` });
            }
            catch (error) {
                res.status(404).json(error);
            }
        });
    }
}
exports.EventController = EventController;

import { Request, Response } from "express";
import { BookingService } from "../services/bookingService";
import { EventRepository } from "../repositories/eventRepository";
import { BookingRepository } from "../repositories/bookingRepository";

const eventRepo = new EventRepository();
const bookingRepo = new BookingRepository();
const bookingService = new BookingService(eventRepo, bookingRepo);

export class BookingController {
  static async reserve(req: Request, res: Response) {
    try {
      const { event_id, user_id } = req.body;

      if (!event_id || !user_id) {
        res.status(400).json({ error: "Обязательные поля: event_id и user_id" });
      }

      const booking = await bookingService.reservationSeat(event_id, user_id);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

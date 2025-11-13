import { Request, Response } from "express";
import { EventRepository } from "../repositories/eventRepository";
import { EventService } from "../services/eventService";

const eventRepo = new EventRepository();
const eventService = new EventService(eventRepo);

export class EventController {
  static async createEvent(req: Request, res: Response) {
    try {
      const { name, total_seats } = req.body;

      if (!name || !total_seats) {
        res
          .status(400)
          .json({ error: "Обязательные поля: name и total_seats" });
      }

      const event = await eventService.createEvent(name, total_seats);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

import { EventRepository } from "../repositories/eventRepository";

export class EventService {
  constructor(private readonly eventRepo: EventRepository) {
  }
  /* Создание ивента (имя ивента и количество посадочных мест) */
  async createEvent(name: string, total_seats: string) {
    try {
      const result = await this.eventRepo.createEvent(name, total_seats);
    } catch (error) {
      throw error;
    }
  }
}
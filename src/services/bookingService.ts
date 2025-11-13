import pool from "../db/postgres";
import { EventRepository } from "../repositories/eventRepository";
import { BookingRepository } from "../repositories/bookingRepository";

export class BookingService {
  private eventRepo: EventRepository;
  private bookingRepo: BookingRepository;

  constructor(eventRepo: EventRepository, bookingRepo: BookingRepository) {
    this.eventRepo = eventRepo;
    this.bookingRepo = bookingRepo;
  }

  async reservationSeat(event_id: string, user_id: string) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Проверка наличие событие
      const isEvent = await this.eventRepo.getEventById(event_id);
      if (!isEvent) {
        await client.query("ROLLBACK");
        throw new Error("Событие не существует!");
      }

      // Проверка, забронировал ли юзер это событие
      const isReservation: boolean = await this.bookingRepo.findBooking(
        event_id,
        user_id
      );
      if (!isReservation) {
        await client.query("ROLLBACK");
        throw new Error(
          "Нет возможности повторно забронировать одно и то-же событие"
        );
      }

      // Проверка и последующие изменение мест в events
      const isAvailability = await this.eventRepo.decreaseSeat(event_id);
      if (isAvailability.rowCount === 0) {
        await client.query("ROLLBACK");
        throw new Error("Свободных мест больше нет");
      }

      // Создание записи о бронирование 
      const booking = await this.bookingRepo.createBooking(event_id, user_id);

      await client.query("COMMIT");
      return booking;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

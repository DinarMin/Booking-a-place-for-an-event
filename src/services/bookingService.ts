const pool = require("../db/postgres");
const EventRepository = require("../repositories/eventRepository");
const BoookingRepository = require("../repositories/bookingRepository");

class BookingService {
  constructor() {
    this.eventRepo = new EventRepository();
    this.bookingRepo = new BookingService();
  }

  async reservationSeat(event_id: string, user_id: string) {
    const client = await pool.connect();

    try {
      
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}

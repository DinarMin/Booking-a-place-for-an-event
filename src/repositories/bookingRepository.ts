const pool = require("../db/postgres");

type BookingParams = {
  event_id: string;
  user_id: string;
};

class BookingRepository {
  async findBooking({ event_id, user_id }: BookingParams): Promise<boolean> {
    try {
      const result = await pool.query(
        "SELECT EXISTS * FROM bookings WHERE event_id=$1 AND user_id=$2",
        [event_id, user_id]
      );
      return result.rows[0].exists;
    } catch (error) {
      throw error;
    }
  }

  async createBooking({ event_id, user_id }: BookingParams) {
    try {
      const result = await pool.query(
        "INSERT INTO bookings(event_id, user_id) VALUES($1, $2) RETURNING *",
        [event_id, user_id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BookingRepository;

const pool = require("../db/postgres");

class EventRepository {
  async getEventById(event_id: string) {
    try {
      const result = pool.query("SELECT * FROM events WHERE id = $1", 
        [event_id,]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async decreaseSeat(event_id) {
    await pool.query(
      `UPDATE events
        SET total_seats = total_seats - 1
        WHERE id = $1 AND total_seats > 0
      `,
      [event_id]
    );
  }
}

module.exports = EventRepository;

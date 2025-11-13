import pool from "../db/postgres";
export class EventRepository {

  async createEvent(name: string, total_seats: string) {
    try {
      const result = await pool.query("INSERT INTO events (name, total_seats) VALUES($1, $2) RETURNING *",
        [name, total_seats]
      )
    } catch (error) {
      throw error;
    }
  }

  async getEventById(event_id: string) {
    try {
      const result = await pool.query("SELECT * FROM events WHERE id = $1", [
        event_id,
      ]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async decreaseSeat(event_id: string) {
    try {
      const result = await pool.query(
        `UPDATE events
          SET total_seats = total_seats - 1
          WHERE id = $1 AND total_seats > 0
          RETURNING id, total_seats
        `,
        [event_id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}

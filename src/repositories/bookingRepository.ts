import pool from "../db/postgres";
export class BookingRepository {
  // Проверка, забронировал ли юзер это событие
  async findBooking(event_id:string, user_id: string): Promise<boolean> {
    try {
      const result = await pool.query(
        "SELECT EXISTS (SELECT 1 FROM bookings WHERE event_id=$1 AND user_id=$2)",
        [event_id, user_id]
      );
      return result.rows[0].exists;
    } catch (error) {
      throw error;
    }
  }
  
  async createBooking(event_id: string, user_id: string): Promise<void> {
    // Создание записи о бронирование 
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

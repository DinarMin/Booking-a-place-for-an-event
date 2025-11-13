import pool from "../db/postgres";

export class GetTablesRepository {
  /* Вывод двух таблиц и их содержимое */
  async getTables() {
    try {
      const result = await pool.query(
        "SELECT json_build_object( \
        'events', (SELECT json_agg(e) FROM events e), \
        'bookings', (SELECT json_agg(b) FROM bookings b) \
        ) AS data;"
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

import pg from "pg";
import { readFile } from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function initDB() {
  const __dirname = path.dirname(__filename);
  const sql = path.join(__dirname, "..", "..", "src", "db", "init.sql");

  try {
    const sqlDB = await readFile(sql, "utf-8");
    await pool.query(sqlDB);
    console.log("Таблицы events, booking успешно добавлены в базу данных");
    3;
  } catch (error) {
    console.error(
      "Произошла ошибка, таблицы events, booking не добавлены в базу данных.",
      error
    );
  }
}

pool.on("connect", () => {
  console.log("Успешный запрос к базе");
});

pool.on("error", () => {
  console.log("Ошибка запроса к базе");
  throw Error;
});

export default pool;

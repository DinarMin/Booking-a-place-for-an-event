import pg from "pg";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mytestdb",
  password: "dinar2202",
  port: 5432,
});

export async function initDB() {
  const __dirname = path.dirname(__filename);
  const sql = path.join(__dirname, "..", "..", "src", "db", "init.sql");

  try {
    const sqlDB = await readFile(sql, "utf-8");
    await pool.query(sqlDB);
    console.log("Таблицы events, booking успешно добавлены в базу данных"); 3 
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

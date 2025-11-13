import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "user",
  host: "db",
  database: "mytestdb",
  password: "admin123",
  port: 5432,
});

pool.on("connect", () => {
  console.log("Успешный запрос к базе");
});

pool.on("error", () => {
  console.log("Ошибка запроса к базе");
  throw Error;
});

export default pool;
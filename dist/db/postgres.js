"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = initDB;
const pg_1 = __importDefault(require("pg"));
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Pool } = pg_1.default;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
function initDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const __dirname = path_1.default.dirname(__filename);
        const sql = path_1.default.join(__dirname, "..", "..", "src", "db", "init.sql");
        try {
            const sqlDB = yield (0, promises_1.readFile)(sql, "utf-8");
            yield pool.query(sqlDB);
            console.log("Таблицы events, booking успешно добавлены в базу данных");
            3;
        }
        catch (error) {
            console.error("Произошла ошибка, таблицы events, booking не добавлены в базу данных.", error);
        }
    });
}
pool.on("connect", () => {
    console.log("Успешный запрос к базе");
});
pool.on("error", () => {
    console.log("Ошибка запроса к базе");
    throw Error;
});
exports.default = pool;

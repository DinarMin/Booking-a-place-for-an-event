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
exports.GetTablesRepository = void 0;
const postgres_1 = __importDefault(require("../db/postgres"));
class GetTablesRepository {
    /* Вывод двух таблиц и их содержимое */
    getTables() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield postgres_1.default.query("SELECT json_build_object( \
        'events', (SELECT json_agg(e) FROM events e), \
        'bookings', (SELECT json_agg(b) FROM bookings b) \
        ) AS data;");
                return result.rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.GetTablesRepository = GetTablesRepository;
